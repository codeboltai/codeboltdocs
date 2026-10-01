const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { createHash } = require('crypto');

const SITE_URL = 'https://docs.codebolt.ai';
const ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(ROOT, 'docs');
const DEFAULT_GENERATED_DIR = path.resolve(ROOT, '..', 'CodeBolt', 'sdks', 'api-docs-index', 'generated');
const GENERATED_DIR = path.resolve(process.env.CODEBOLT_KNOWLEDGE_GENERATED_DIR || DEFAULT_GENERATED_DIR);
const KNOWLEDGE_INDEX_PATH = path.join(GENERATED_DIR, 'knowledge-index.jsonl');
const KNOWLEDGE_MANIFEST_PATH = path.join(GENERATED_DIR, 'knowledge-manifest.json');
const LLM_ROOT = 'llms';
const EXPECTED_SKILL_IDS = [
  'codebolt.skill.build-custom-agent',
  'codebolt.skill.create-custom-tool',
  'codebolt.skill.use-execution-plans',
  'codebolt.skill.use-mcp-tools',
  'codebolt.skill.debug-tool-call',
];

const SECTION_CONFIG = [
  { prefix: '1_index.md', heading: 'Start Here', order: 0 },
  { prefix: '01_get-started/', heading: 'Get Started', order: 1 },
  { prefix: '02_using-codebolt/', heading: 'Using Codebolt', order: 2 },
  { prefix: '02_concepts/', heading: 'Concepts', order: 3 },
  { prefix: '03_guides/', heading: 'Guides', order: 4 },
  { prefix: '04_build-on-codebolt/', heading: 'Build on Codebolt', order: 5 },
  { prefix: '05_reference/', heading: 'Reference', order: 6 },
  { prefix: 'agent/', heading: 'Agent Knowledge', order: 7 },
];

const EXCLUDE_SUBSTRINGS = [
  'Excalidraw/',
];

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function createDigest(text) {
  return createHash('sha256').update(text, 'utf8').digest('hex');
}

function walk(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  return fs.readdirSync(dirPath, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return [fullPath];
  });
}

function shouldInclude(relativePath) {
  const normalized = relativePath.replace(/\\/g, '/');
  if (!/\.(md|mdx)$/i.test(normalized)) return false;
  if (normalized.endsWith('.bak')) return false;
  if (normalized === 'Issue.md' || normalized === 'sortspec.md') return false;
  return !EXCLUDE_SUBSTRINGS.some((substring) => normalized.includes(substring));
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { frontmatter: {}, body: raw };

  try {
    return {
      frontmatter: yaml.load(match[1]) || {},
      body: raw.slice(match[0].length),
    };
  } catch {
    return { frontmatter: {}, body: raw.slice(match[0].length) };
  }
}

function slugSegment(value) {
  return value
    .replace(/\.[^.]+$/, '')
    .replace(/^\d+[a-z]?_/, '')
    .replace(/_/g, '-')
    .toLowerCase();
}

function prettySegment(value) {
  return value
    .replace(/\.[^.]+$/, '')
    .replace(/^\d+[a-z]?_/, '')
    .replace(/[_-]/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function stripMdxNoise(body) {
  let cleaned = body.replace(/\r\n/g, '\n');
  cleaned = cleaned.replace(/^\s*import\s.+$/gm, '');
  cleaned = cleaned.replace(/^\s*export\s.+$/gm, '');
  cleaned = cleaned.replace(/<DocCardGrid[\s\S]*?\]}\s*\/>/g, '');
  cleaned = cleaned.replace(/<Tabs[\s\S]*?<\/Tabs>/g, '');
  cleaned = cleaned.replace(/<TabItem[\s\S]*?<\/TabItem>/g, '');
  cleaned = cleaned.replace(/<details[\s\S]*?<\/details>/g, '');
  cleaned = cleaned.replace(/<p[^>]*>(.*?)<\/p>/g, '$1');
  cleaned = cleaned.replace(/^\s*<[^>\n]+>\s*$/gm, '');
  cleaned = cleaned.replace(/^\s*<\/[^>\n]+>\s*$/gm, '');
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  return cleaned.trim();
}

function extractTitle(frontmatter, body, relativePath) {
  if (typeof frontmatter.title === 'string' && frontmatter.title.trim()) return frontmatter.title.trim();
  const heading = body.match(/^#\s+(.+)$/m);
  if (heading) return heading[1].trim();
  return prettySegment(path.basename(relativePath));
}

function extractDescription(frontmatter, cleanedBody) {
  if (typeof frontmatter.description === 'string' && frontmatter.description.trim()) {
    return frontmatter.description.trim().replace(/\s+/g, ' ');
  }

  const blockquote = cleanedBody.match(/^>\s+(.+)$/m);
  if (blockquote) return blockquote[1].trim().replace(/\s+/g, ' ');

  const paragraph = cleanedBody
    .split(/\n\s*\n/)
    .map((item) => item.replace(/\s+/g, ' ').trim())
    .find((item) => item && !item.startsWith('#') && !item.startsWith('```') && !item.startsWith('<'));

  return paragraph || '';
}

function extractHeadings(markdown) {
  return Array.from(markdown.matchAll(/^#{1,4}\s+(.+)$/gm))
    .map((match) => match[1].replace(/\s+#*$/, '').trim())
    .filter(Boolean);
}

function removeDuplicateTopHeading(title, body) {
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return body.replace(new RegExp(`^#\\s+${escapedTitle}\\s*\\n+`, 'i'), '').trim();
}

function toLlmsPath(relativePath) {
  const parsed = path.parse(relativePath);
  const dirParts = parsed.dir.split(path.sep).filter(Boolean).map(slugSegment);
  return path.posix.join(...dirParts, `${slugSegment(parsed.base)}.md`);
}

function sectionFor(relativePath) {
  const normalized = relativePath.replace(/\\/g, '/');
  return SECTION_CONFIG.find((section) => normalized === section.prefix || normalized.startsWith(section.prefix)) || {
    heading: 'Optional',
    order: 99,
  };
}

function inferKind(relativePath, frontmatter) {
  const normalized = relativePath.replace(/\\/g, '/').toLowerCase();
  if (typeof frontmatter.kind === 'string') return frontmatter.kind;
  if (normalized === 'agent/codebolt-agent-manual.md' || normalized.endsWith('/codebolt-agent-manual.md')) return 'manual';
  if (normalized.includes('/skills/') || normalized.startsWith('agent/skills/')) return 'skill';
  if (normalized.includes('troubleshooting')) return 'troubleshooting';
  if (normalized.includes('/examples/') || normalized.includes('/example-')) return 'examples';
  if (normalized.startsWith('05_reference/')) return 'api';
  return 'docs';
}

function inferTags(relativePath, frontmatter, headings) {
  const explicitTags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];
  const pathTags = relativePath
    .replace(/\\/g, '/')
    .split(/[/.]/)
    .flatMap((part) => part.split(/[_-]/))
    .map((part) => part.toLowerCase().trim())
    .filter((part) => part && !/^\d+[a-z]?$/.test(part) && part.length > 2);
  const headingTags = headings
    .join(' ')
    .split(/\s+/)
    .map((part) => part.toLowerCase().replace(/[^a-z0-9]/g, ''))
    .filter((part) => part.length > 3);
  return Array.from(new Set([...explicitTags, ...pathTags, ...headingTags])).slice(0, 30);
}

function normalizeAudience(frontmatter, kind) {
  if (Array.isArray(frontmatter.audience)) return frontmatter.audience;
  if (kind === 'manual' || kind === 'skill') return ['agent', 'developer'];
  return ['agent', 'developer', 'user'];
}

function frontmatterStringArray(frontmatter, ...keys) {
  for (const key of keys) {
    const value = frontmatter[key];
    if (Array.isArray(value)) {
      return value.map((item) => String(item).trim()).filter(Boolean);
    }
    if (typeof value === 'string' && value.trim()) {
      return [value.trim()];
    }
  }
  return [];
}

function createId(kind, relativePath, frontmatter) {
  if (typeof frontmatter.id === 'string' && frontmatter.id.trim()) return frontmatter.id.trim();

  const withoutExtension = relativePath
    .replace(/\\/g, '/')
    .replace(/\.(md|mdx)$/i, '')
    .split('/')
    .map((part) => slugSegment(part).replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''))
    .filter(Boolean)
    .join('.');
  return `${kind}.${withoutExtension}`;
}

function buildMarkdownDoc(title, description, body) {
  const pieces = [`# ${title}`];
  if (description) pieces.push(`> ${description}`);
  if (body) pieces.push(body);
  return `${pieces.join('\n\n').trim()}\n`;
}

function main() {
  const sourceFiles = walk(DOCS_DIR)
    .map((fullPath) => ({ fullPath, relativePath: path.relative(DOCS_DIR, fullPath) }))
    .filter(({ relativePath }) => shouldInclude(relativePath))
    .sort((first, second) => first.relativePath.localeCompare(second.relativePath));

  const records = sourceFiles.map(({ fullPath, relativePath }) => {
    const normalizedRelativePath = relativePath.replace(/\\/g, '/');
    const raw = fs.readFileSync(fullPath, 'utf8');
    const { frontmatter, body } = parseFrontmatter(raw);
    const cleanedBody = stripMdxNoise(body);
    const title = extractTitle(frontmatter, cleanedBody, normalizedRelativePath);
    const description = extractDescription(frontmatter, cleanedBody);
    const bodyWithoutTitle = removeDuplicateTopHeading(title, cleanedBody);
    const markdown = buildMarkdownDoc(title, description, bodyWithoutTitle);
    const headings = extractHeadings(markdown);
    const kind = inferKind(normalizedRelativePath, frontmatter);
    const llmsPath = toLlmsPath(normalizedRelativePath).replace(/\\/g, '/');
    const section = sectionFor(normalizedRelativePath);

    return {
      id: createId(kind, normalizedRelativePath, frontmatter),
      title,
      description,
      kind,
      section: section.heading,
      sourceUrl: `${SITE_URL}/${LLM_ROOT}/${llmsPath}`,
      markdownPath: `/${LLM_ROOT}/${llmsPath}`,
      sourcePath: `docs/${normalizedRelativePath}`,
      headings,
      tags: inferTags(normalizedRelativePath, frontmatter, headings),
      audience: normalizeAudience(frontmatter, kind),
      triggers: frontmatterStringArray(frontmatter, 'triggers'),
      requiredDocs: frontmatterStringArray(frontmatter, 'requiredDocs', 'required_docs'),
      relatedApiSymbols: frontmatterStringArray(frontmatter, 'relatedApiSymbols', 'related_api_symbols'),
      relatedSkills: frontmatterStringArray(frontmatter, 'relatedSkills', 'related_skills'),
      digest: createDigest(markdown),
      content: markdown,
    };
  });

  ensureDir(GENERATED_DIR);
  fs.writeFileSync(KNOWLEDGE_INDEX_PATH, `${records.map((record) => JSON.stringify(record)).join('\n')}\n`, 'utf8');

  const kindCounts = records.reduce((counts, record) => {
    counts[record.kind] = (counts[record.kind] || 0) + 1;
    return counts;
  }, {});

  const sectionCounts = records.reduce((counts, record) => {
    counts[record.section] = (counts[record.section] || 0) + 1;
    return counts;
  }, {});

  const missingExpectedSkills = EXPECTED_SKILL_IDS.filter((id) => !records.some((record) => record.id === id));
  if (!kindCounts.manual) {
    throw new Error('Knowledge index requires at least one manual record. Expected docs/agent/codebolt-agent-manual.md.');
  }
  if (missingExpectedSkills.length > 0) {
    throw new Error(`Knowledge index is missing expected skills: ${missingExpectedSkills.join(', ')}`);
  }

  fs.writeFileSync(
    KNOWLEDGE_MANIFEST_PATH,
    JSON.stringify({
      generatedAt: new Date().toISOString(),
      sourceCount: records.length,
      kinds: kindCounts,
      sections: sectionCounts,
      files: {
        index: path.relative(GENERATED_DIR, KNOWLEDGE_INDEX_PATH).replace(/\\/g, '/'),
        manifest: path.relative(GENERATED_DIR, KNOWLEDGE_MANIFEST_PATH).replace(/\\/g, '/'),
      },
      urlPrefix: `${SITE_URL}/${LLM_ROOT}`,
    }, null, 2),
    'utf8',
  );

  console.log(`Generated ${path.relative(ROOT, KNOWLEDGE_INDEX_PATH)} (${records.length} records).`);
}

main();
