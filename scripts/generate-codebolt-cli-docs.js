const fs = require('fs');
const path = require('path');

const DOCS_ROOT = path.resolve(__dirname, '..', 'docs', '05_reference', '06_codebolt-cli');
const ACTIONS_DOCS_DIR = path.join(DOCS_ROOT, 'actions');
const COMMANDS_DOCS_DIR = path.join(DOCS_ROOT, 'commands');
const CLI_ROOT = path.resolve(__dirname, '..', '..', 'CodeBolt', 'packages', 'cli', 'src');
const ACTIONS_SRC_DIR = path.join(CLI_ROOT, 'actions');
const COMMANDS_SRC_DIR = path.join(CLI_ROOT, 'commands');

const ACTION_FILES = [
  'agent.ts',
  'tool.ts',
  'provider.ts',
  'plugin.ts',
  'skill.ts',
  'actionblock.ts',
  'capability.ts',
  'executor.ts',
];

// Keep the existing reference URLs while using the current command namespaces.
const COMMAND_NAMESPACES = {
  agents: 'agent',
  threads: 'thread',
  tasks: 'task',
  jobs: 'job',
  git: 'git',
  projects: 'project',
  todos: 'todo',
  llm: 'llm',
};

function loadGatewayCommandSpecs() {
  const registryPath = path.join(COMMANDS_SRC_DIR, 'generated', 'gateway-tool-command-specs.ts');
  const source = fs.readFileSync(registryPath, 'utf8');
  const declaration = 'export const gatewayToolCommandSpecs: GatewayToolCommandSpec[] = ';
  const start = source.indexOf(declaration);
  if (start < 0) throw new Error(`Could not find the CLI command registry in ${registryPath}`);
  return JSON.parse(source.slice(start + declaration.length).trim().replace(/;$/, ''));
}

function markdownCell(text) {
  return text.replace(/&/g, '&amp;')
    .replace(/[|<>{}]/g, character => `&#${character.charCodeAt(0)};`)
    .replace(/\s+/g, ' ');
}

function renderGatewayReference(namespace, specs) {
  const title = `${humanize(namespace)} Gateway Commands`;
  const rows = specs.map(spec => {
    const flags = spec.required.map(name =>
      '--' + name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/[_\s.]+/g, '-').toLowerCase()
    );
    const help = `codebolt command ${namespace} ${spec.commandName} --help`;
    return `| \`${spec.commandName}\` | ${markdownCell(spec.description)} | ${flags.map(flag => `\`${flag}\``).join(', ') || 'None'} | \`${help}\` |`;
  }).join('\n');

  return `---\ntitle: ${yamlQuote(title)}\n---\n\nUse \`codebolt command ${namespace}\` against a running server. Pass \`--help\` to a subcommand for its full options and accepted values.\n\n| Subcommand | Purpose | Required flags | Help |\n| --- | --- | --- | --- |\n${rows}\n`;
}

function renderGatewayIndex(specs) {
  const filenames = Object.fromEntries(Object.entries(COMMAND_NAMESPACES).map(([filename, namespace]) => [namespace, filename]));
  const counts = new Map();
  for (const spec of specs) counts.set(spec.namespace, (counts.get(spec.namespace) || 0) + 1);
  const rows = [...counts.keys()].sort().map(namespace => {
    const filename = filenames[namespace];
    const label = filename ? `[\`${namespace}\`](./${filename}.md)` : `\`${namespace}\``;
    return `| ${label} | ${counts.get(namespace)} |`;
  }).join('\n');
  return `---\nsidebar_label: Overview\nsidebar_position: 1\ntitle: Gateway Commands\n---\n\nThe CLI registers commands from the built-in gateway tool registry. Start the CodeBolt server, then use \`codebolt command --help\` to list the namespaces available in your CLI. Use \`--cli-connect-port\` to select the server port, \`--host\` for the gateway host, or \`--json\` for raw output.\n\nThe low-level API is available through \`codebolt command api --help\`.\n\n| Namespace | Subcommands |\n| --- | ---: |\n${rows}\n`;
}

const TITLE_MAP = {
  llm: 'LLM',
  git: 'Git',
  actionblock: 'Action Block',
};

function humanize(name) {
  if (TITLE_MAP[name]) return TITLE_MAP[name];
  return name
    .split('-')
    .map(part => part ? part[0].toUpperCase() + part.slice(1) : part)
    .join(' ');
}

function yamlQuote(value) {
  return JSON.stringify(value);
}

function parseQuoted(line, methodName) {
  const match = line.match(new RegExp(`\\.${methodName}\\((['"\`])((?:\\\\.|(?!\\1).)*)\\1`));
  return match ? match[2].replace(/\\'/g, "'").replace(/\\"/g, '"').trim() : '';
}

function parseOption(line, methodName) {
  const re = new RegExp(`\\.${methodName}\\((['"\`])((?:\\\\.|(?!\\1).)*)\\1\\s*,\\s*(['"\`])((?:\\\\.|(?!\\3).)*)\\3`);
  const match = line.match(re);
  if (!match) return null;
  return {
    flags: match[2].trim(),
    description: match[4].replace(/\\'/g, "'").replace(/\\"/g, '"').trim(),
    required: methodName === 'requiredOption',
  };
}

function parseArgument(line) {
  const match = line.match(/\.argument\((['"`])((?:\\.|(?!\1).)*)\1\s*,\s*(['"`])((?:\\.|(?!\3).)*)\3/);
  if (!match) return null;
  return {
    syntax: match[2].trim(),
    description: match[4].replace(/\\'/g, "'").replace(/\\"/g, '"').trim(),
  };
}

function parseGroupFile(filePath) {
  const source = fs.readFileSync(filePath, 'utf8');
  const lines = source.split(/\r?\n/);
  const fileBase = path.basename(filePath, '.ts');

  let groupVar = '';
  let groupName = '';
  let groupDescription = '';
  let current = null;
  const subcommands = [];

  for (const line of lines) {
    if (!groupVar) {
      const groupMatch = line.match(/const\s+(\w+)\s*=\s*new Command\('([^']+)'\)/);
      if (groupMatch) {
        groupVar = groupMatch[1];
        groupName = groupMatch[2];
      }
    }

    if (groupVar && !groupDescription && !current && /^\s*\.description\(/.test(line)) {
      groupDescription = parseQuoted(line, 'description');
      continue;
    }

    const subMatch = groupVar ? line.match(new RegExp(`^\\s*${groupVar}\\.command\\('([^']+)'\\)`)) : null;
    if (subMatch) {
      current = {
        name: subMatch[1],
        description: '',
        arguments: [],
        options: [],
      };
      continue;
    }

    if (!current) continue;

    if (!current.description && /\.description\(/.test(line)) {
      current.description = parseQuoted(line, 'description');
      continue;
    }

    const arg = parseArgument(line);
    if (arg) {
      current.arguments.push(arg);
      continue;
    }

    const requiredOption = parseOption(line, 'requiredOption');
    if (requiredOption) {
      current.options.push(requiredOption);
      continue;
    }

    const option = parseOption(line, 'option');
    if (option) {
      current.options.push(option);
      continue;
    }

    if (/\.action\(/.test(line)) {
      subcommands.push(current);
      current = null;
    }
  }

  return {
    name: groupName || fileBase,
    title: humanize(groupName || fileBase),
    description: groupDescription,
    subcommands,
  };
}

function renderOptionsTable(options) {
  if (options.length === 0) return 'This command takes no options.';
  return [
    '| Flags | Required | Description |',
    '| --- | --- | --- |',
    ...options.map(option => `| \`${option.flags}\` | ${option.required ? 'Yes' : 'No'} | ${option.description} |`),
  ].join('\n');
}

function renderArgumentsTable(args) {
  if (args.length === 0) return 'This command takes no positional arguments.';
  return [
    '| Argument | Description |',
    '| --- | --- |',
    ...args.map(arg => `| \`${arg.syntax}\` | ${arg.description} |`),
  ].join('\n');
}

function syntaxSuffix(command) {
  const parts = [];
  for (const arg of command.arguments) {
    parts.push(arg.syntax);
  }
  if (command.options.length > 0) {
    parts.push('[options]');
  }
  return parts.length > 0 ? ` ${parts.join(' ')}` : '';
}

function renderActionDoc(group) {
  const basePrefix = `codebolt action ${group.name}`;
  const introLines = [
    group.description || `Reference for the \`${basePrefix}\` command group.`,
    '',
    'These commands manage CodeBolt extensions. Most of them create a temporary local server context through `executeAction()` before calling the extension endpoints.',
  ];

  const summaryRows = group.subcommands
    .map(command => `| \`${command.name}\` | ${command.description || '-'} | ${command.arguments.length} | ${command.options.length} |`)
    .join('\n');

  const sections = group.subcommands.map(command => {
    const headings = [
      `## \`${command.name}\``,
      '',
      command.description || 'No description defined in source.',
      '',
      '```text',
      `${basePrefix} ${command.name}${syntaxSuffix(command)}`,
      '```',
      '',
      '### Arguments',
      '',
      renderArgumentsTable(command.arguments),
      '',
      '### Options',
      '',
      renderOptionsTable(command.options),
    ];

    return headings.filter(Boolean).join('\n');
  }).join('\n\n');

  return `---\nsidebar_label: ${yamlQuote(group.title)}\ntitle: ${yamlQuote(`${group.title} CLI`)}\ndescription: ${yamlQuote(`Reference for the ${basePrefix} command group.`)}\n---\n\n${introLines.join('\n')}\n\n## Subcommands\n\n| Subcommand | Description | Args | Options |\n| --- | --- | ---: | ---: |\n${summaryRows}\n\n${sections}\n`;
}

function renderActionIndex(groups) {
  const title = 'Action Commands';
  const description = 'Reference for `codebolt action ...` command groups.';
  const rows = groups
    .map(group => `| [\`${group.name}\`](./${group.name}.md) | ${group.subcommands.length} | ${group.description || '-'} |`)
    .join('\n');

  return `---\nsidebar_label: "Overview"\nsidebar_position: 1\ntitle: ${yamlQuote(title)}\ndescription: ${yamlQuote(description)}\n---\n\n| Group | Subcommands | Description |\n| --- | ---: | --- |\n${rows}\n`;
}

function main() {
  const actionGroups = ACTION_FILES.map(file => parseGroupFile(path.join(ACTIONS_SRC_DIR, file)));
  const commandSpecs = loadGatewayCommandSpecs().filter(spec => !spec.chatOnly);
  const commandGroups = Object.entries(COMMAND_NAMESPACES).map(([filename, namespace]) => {
    const specs = commandSpecs.filter(spec => spec.namespace === namespace);
    if (!specs.length) throw new Error(`No registered CLI commands for ${namespace}`);
    return {filename, namespace, specs};
  });

  fs.mkdirSync(ACTIONS_DOCS_DIR, {recursive: true});
  fs.mkdirSync(COMMANDS_DOCS_DIR, {recursive: true});

  fs.writeFileSync(
    path.join(ACTIONS_DOCS_DIR, '_category_.json'),
    JSON.stringify({
      label: 'Action Commands',
      position: 3,
      collapsible: true,
      collapsed: false,
      className: 'red',
      link: {
        type: 'doc',
        id: 'reference/codebolt-cli/actions/index',
      },
    }, null, 2) + '\n'
  );

  fs.writeFileSync(
    path.join(COMMANDS_DOCS_DIR, '_category_.json'),
    JSON.stringify({
      label: 'Gateway Commands',
      position: 4,
      collapsible: true,
      collapsed: false,
      className: 'red',
      link: {
        type: 'doc',
        id: 'reference/codebolt-cli/commands/index',
      },
    }, null, 2) + '\n'
  );

  fs.writeFileSync(path.join(ACTIONS_DOCS_DIR, 'index.md'), renderActionIndex(actionGroups));
  fs.writeFileSync(path.join(COMMANDS_DOCS_DIR, 'index.md'), renderGatewayIndex(commandSpecs));

  for (const group of actionGroups) {
    fs.writeFileSync(path.join(ACTIONS_DOCS_DIR, `${group.name}.md`), renderActionDoc(group));
  }

  for (const group of commandGroups) {
    fs.writeFileSync(path.join(COMMANDS_DOCS_DIR, `${group.filename}.md`), renderGatewayReference(group.namespace, group.specs));
  }

  console.log(`Generated Codebolt CLI docs for ${actionGroups.length} action groups and ${commandGroups.length} command modules.`);
}

main();
