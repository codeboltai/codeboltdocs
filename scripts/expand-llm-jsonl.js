const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const BUILD_DIR = path.join(ROOT, 'build');
const LLM_ROOT = 'llms';
const LLM_TEMP_DIR = path.join(ROOT, '.llmtemp');
const LLM_JSONL_PATH = path.join(LLM_TEMP_DIR, 'llm.jsonl');
const LLM_MANIFEST_PATH = path.join(LLM_TEMP_DIR, 'llm-manifest.json');
const LLMS_TEXT = 'llms.txt';
const LLMS_FULL_TEXT = 'llms-full.txt';
const LLMS_MANIFEST = 'llm-manifest.json';
const GENERATOR_SCRIPT = path.join(__dirname, 'generate-llms-txt.js');

const INTRO_BLOCK = [
  '# CodeBolt Documentation',
  '',
  '> Product documentation for CodeBolt, an AI-native coding environment with multi-agent orchestration, MCP tooling, and extensible agent architecture.',
  '',
  'This file provides a curated index of the most important documentation. Each link points to a clean markdown mirror suitable for LLM retrieval. For exhaustive API/type details see the Reference section overviews.',
  '',
];

const FULL_HEADER = [
  '# CodeBolt Documentation',
  '',
  '> Product documentation for CodeBolt, an AI-native coding environment with multi-agent orchestration, MCP tooling, and extensible agent architecture.',
  '',
  'This file contains the full content of all curated documentation pages. For a link-only index see [llms.txt](./llms.txt).',
  '',
  '---',
  '',
];

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = { target: 'temp' };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === '--target' && index + 1 < args.length) {
      parsed.target = args[index + 1];
      index += 1;
      continue;
    }
    if (arg.startsWith('--target=')) {
      parsed.target = arg.split('=', 2)[1];
    }
  }

  if (!['temp', 'build'].includes(parsed.target)) {
    throw new Error(`Invalid target "${parsed.target}". Expected "temp" or "build".`);
  }

  return parsed;
}

function getOutputRoot(target) {
  return target === 'build' ? path.join(BUILD_DIR, LLM_ROOT) : path.join(LLM_TEMP_DIR, LLM_ROOT);
}

function toOutputPath(outputRoot, llmsPath) {
  const rel = llmsPath.replace(/\\/g, '/');
  const parts = rel.split('/');
  return path.join(outputRoot, ...parts);
}

function parseJsonl(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function orderedSections(docs) {
  const groups = docs.reduce((acc, doc) => {
    const key = doc.section?.heading || 'Optional';
    if (!acc.has(key)) {
      acc.set(key, []);
    }
    acc.get(key).push(doc);
    return acc;
  }, new Map());

  return [...groups.entries()].sort((a, b) => {
    const orderA = a[1][0]?.section?.order ?? 99;
    const orderB = b[1][0]?.section?.order ?? 99;
    return orderA - orderB || a[0].localeCompare(b[0]);
  });
}

function buildIndexLines(sectionDocs) {
  const lines = [...INTRO_BLOCK];

  for (const [heading, docs] of sectionDocs) {
    lines.push(`## ${heading}`, '');
    for (const doc of docs) {
      const link = `- [${doc.title}](${doc.url})`;
      if (doc.description) {
        lines.push(`${link}: ${doc.description}`);
      } else {
        lines.push(link);
      }
    }
    lines.push('');
  }

  return `${lines.join('\n').trim()}\n`;
}

function buildFullLines(sectionDocs) {
  const lines = [...FULL_HEADER];

  for (const [heading, docs] of sectionDocs) {
    lines.push(`## ${heading}`, '');
    for (const doc of docs) {
      if (typeof doc.markdown === 'string' && doc.markdown.trim()) {
        lines.push(doc.markdown.trim(), '');
        lines.push('---', '');
      }
    }
  }

  return `${lines.join('\n').trim()}\n`;
}

function rebuildIndexFromJsonl(docs, isCuratedOnly) {
  const curatedDocs = isCuratedOnly ? docs.filter((doc) => doc.curated) : docs;
  return orderedSections(curatedDocs);
}

function main() {
  const { target } = parseArgs();
  const outputRoot = getOutputRoot(target);
  const llmsTxtPath = path.join(outputRoot, LLMS_TEXT);
  const llmsFullPath = path.join(outputRoot, LLMS_FULL_TEXT);
  const llmsManifestPath = path.join(outputRoot, LLMS_MANIFEST);

  if (!fs.existsSync(LLM_JSONL_PATH)) {
    console.log(`Missing ${LLM_JSONL_PATH}, generating now...`);
    execSync(
      `${JSON.stringify(process.execPath)} ${JSON.stringify(GENERATOR_SCRIPT)}`,
      { stdio: 'inherit', cwd: ROOT },
    );

    if (!fs.existsSync(LLM_JSONL_PATH)) {
      throw new Error(`Failed to generate llm.jsonl at ${LLM_JSONL_PATH}`);
    }
  }

  const docs = parseJsonl(LLM_JSONL_PATH);

  ensureDir(outputRoot);

  for (const doc of docs) {
    const destination = toOutputPath(outputRoot, doc.llmsPath);
    ensureDir(path.dirname(destination));
    fs.writeFileSync(destination, doc.markdown || '', 'utf8');
  }

  const curatedSections = rebuildIndexFromJsonl(docs, true);
  fs.writeFileSync(llmsTxtPath, buildIndexLines(curatedSections), 'utf8');
  fs.writeFileSync(llmsFullPath, buildFullLines(curatedSections), 'utf8');
  fs.writeFileSync(
    llmsManifestPath,
    fs.existsSync(LLM_MANIFEST_PATH)
      ? fs.readFileSync(LLM_MANIFEST_PATH, 'utf8')
      : JSON.stringify({ generatedAt: new Date().toISOString(), sourceCount: docs.length }, null, 2),
    'utf8',
  );

  console.log(
    `Expanded ${docs.length} records from ${LLM_JSONL_PATH} into ${path.relative(ROOT, outputRoot)}.`,
  );
  console.log(`Generated ${path.relative(ROOT, llmsTxtPath)} and ${path.relative(ROOT, llmsFullPath)}.`);
}

main();
