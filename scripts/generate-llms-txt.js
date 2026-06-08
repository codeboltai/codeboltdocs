const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { createHash } = require('crypto');

const SITE_URL = 'https://docs.codebolt.ai';
const ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(ROOT, 'docs');
const LLM_TEMP_DIR = path.join(ROOT, '.llmtemp');
const LLM_JSONL_PATH = path.join(LLM_TEMP_DIR, 'llm.jsonl');
const LLM_MANIFEST_PATH = path.join(LLM_TEMP_DIR, 'llm-manifest.json');
const LLM_ROOT = 'llms';

const SECTION_CONFIG = [
  { prefix: '1_index.md', heading: 'Start Here', order: 0 },
  { prefix: '02_using-codebolt/', heading: 'Using Codebolt', order: 1 },
  { prefix: '02_concepts/', heading: 'Concepts', order: 2 },
  { prefix: '03_guides/', heading: 'Guides', order: 3 },
  { prefix: '04_build-on-codebolt/', heading: 'Build on Codebolt', order: 4 },
];

const EXCLUDE_SUBSTRINGS = [
  '05_reference/',
  'type-reference/',
  'api-reference/',
  'event-reference/',
  'api-access/',
  'mcp-access/',
  'utility-functions/',
  'pseudo_cli/',
];

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function createDigest(text) {
  return createHash('sha256').update(text, 'utf8').digest('hex');
}

function walk(dirPath) {
  return fs.readdirSync(dirPath, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      return walk(fullPath);
    }
    return [fullPath];
  });
}

function shouldInclude(relativePath) {
  const normalized = relativePath.replace(/\\/g, '/');
  if (!/\.(md|mdx)$/i.test(normalized)) return false;
  if (normalized.endsWith('.bak')) return false;
  if (normalized.startsWith('Excalidraw/')) return false;
  if (normalized === 'Issue.md' || normalized === 'sortspec.md') return false;
  for (const sub of EXCLUDE_SUBSTRINGS) {
    if (normalized.includes(sub)) return false;
  }
  return true;
}

function isCuratedForIndex(relativePath) {
  const normalized = relativePath.replace(/\\/g, '/');
  const basename = path.basename(normalized, path.extname(normalized));
  const slugName = basename.replace(/^\d+[a-z]?_/, '');

  if (normalized === '1_index.md') return true;
  if (slugName === 'overview') return true;
  if (/^quickstart/i.test(slugName)) return true;

  const curated = [
    'what-is-codebolt',
    'what-is-an-agent',
    'architecture',
    'architecture-for-builders',
    'architecture-overview',
    'installation',
  ];
  if (curated.includes(slugName)) return true;

  return false;
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) {
    return { frontmatter: {}, body: raw };
  }

  let frontmatter = {};
  try {
    frontmatter = yaml.load(match[1]) || {};
  } catch (error) {
    frontmatter = {};
  }

  return {
    frontmatter,
    body: raw.slice(match[0].length),
  };
}

function prettySegment(value) {
  return value
    .replace(/\.[^.]+$/, '')
    .replace(/^\d+[a-z]?_/, '')
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function slugSegment(value) {
  return value
    .replace(/\.[^.]+$/, '')
    .replace(/^\d+[a-z]?_/, '')
    .replace(/_/g, '-')
    .toLowerCase();
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
  if (typeof frontmatter.title === 'string' && frontmatter.title.trim()) {
    return frontmatter.title.trim();
  }

  const heading = body.match(/^#\s+(.+)$/m);
  if (heading) {
    return heading[1].trim();
  }

  return prettySegment(path.basename(relativePath));
}

function extractDescription(frontmatter, cleanedBody) {
  if (typeof frontmatter.description === 'string' && frontmatter.description.trim()) {
    return frontmatter.description.trim().replace(/\s+/g, ' ');
  }

  const blockquote = cleanedBody.match(/^>\s+(.+)$/m);
  if (blockquote) {
    return blockquote[1].trim().replace(/\s+/g, ' ');
  }

  const paragraphs = cleanedBody
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .filter((paragraph) => !paragraph.startsWith('#'))
    .filter((paragraph) => !paragraph.startsWith('import '))
    .filter((paragraph) => !paragraph.startsWith('export '))
    .filter((paragraph) => !paragraph.startsWith('```'))
    .filter((paragraph) => !paragraph.startsWith('<'));

  return paragraphs[0] || '';
}

function toLlmsPath(relativePath) {
  const parsed = path.parse(relativePath);
  const dirParts = parsed.dir
    .split(path.sep)
    .filter(Boolean)
    .map(slugSegment);
  const fileName = `${slugSegment(parsed.base)}.md`;
  return path.posix.join(...dirParts, fileName);
}

function removeDuplicateTopHeading(title, body) {
  const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return body.replace(new RegExp(`^#\\s+${escaped}\\s*\\n+`, 'i'), '').trim();
}

function buildMarkdownDoc(doc) {
  const pieces = [`# ${doc.title}`];
  if (doc.description) {
    pieces.push(`> ${doc.description}`);
  }
  if (doc.body) {
    pieces.push(doc.body);
  }
  return `${pieces.join('\n\n').trim()}\n`;
}

function sectionFor(relativePath) {
  const normalized = relativePath.replace(/\\/g, '/');
  for (const section of SECTION_CONFIG) {
    if (normalized === section.prefix || normalized.startsWith(section.prefix)) {
      return section;
    }
  }
  return { heading: 'Optional', order: 99 };
}

function main() {
  const sourceFiles = walk(DOCS_DIR)
    .map((fullPath) => ({
      fullPath,
      relativePath: path.relative(DOCS_DIR, fullPath),
    }))
    .filter(({ relativePath }) => shouldInclude(relativePath))
    .sort((a, b) => a.relativePath.localeCompare(b.relativePath));

  fs.rmSync(LLM_TEMP_DIR, { recursive: true, force: true });
  ensureDir(LLM_TEMP_DIR);

  const docs = sourceFiles.map(({ fullPath, relativePath }) => {
    const raw = fs.readFileSync(fullPath, 'utf8');
    const { frontmatter, body } = parseFrontmatter(raw);
    const cleanedBody = stripMdxNoise(body);
    const title = extractTitle(frontmatter, cleanedBody, relativePath);
    const description = extractDescription(frontmatter, cleanedBody);
    const bodyWithoutTitle = removeDuplicateTopHeading(title, cleanedBody);
    const llmsPath = toLlmsPath(relativePath);
    const markdown = buildMarkdownDoc({
      title,
      description,
      body: bodyWithoutTitle,
    });

    return {
      relativePath: relativePath.replace(/\\/g, '/'),
      section: sectionFor(relativePath),
      title,
      description,
      llmsPath: llmsPath.replace(/\\/g, '/'),
      url: `${SITE_URL}/${LLM_ROOT}/${llmsPath.replace(/\\/g, '/')}`,
      markdown,
      digest: createDigest(markdown),
      curated: isCuratedForIndex(relativePath),
    };
  });

  const curatedDocs = docs.filter((doc) => doc.curated);

  const grouped = docs.reduce((map, doc) => {
    const key = doc.section.heading;
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(doc);
    return map;
  }, new Map());

  const orderedSections = [...grouped.entries()].sort((a, b) => {
    const sectionA = curatedDocs.find((doc) => doc.section.heading === a[0])?.section.order ?? 99;
    const sectionB = curatedDocs.find((doc) => doc.section.heading === b[0])?.section.order ?? 99;
    return sectionA - sectionB;
  });

  const serialized = docs
    .map((doc) =>
      JSON.stringify({
        ...doc,
        relativePath: doc.relativePath,
        section: doc.section,
      }),
    )
    .join('\n');
  fs.writeFileSync(LLM_JSONL_PATH, `${serialized}\n`, 'utf8');

  fs.writeFileSync(
    LLM_MANIFEST_PATH,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        sourceCount: docs.length,
        curatedCount: curatedDocs.length,
        sections: orderedSections.map(([heading, sectionDocs]) => ({
          heading,
          count: sectionDocs.length,
          order: sectionDocs[0]?.section?.order ?? 99,
          files: sectionDocs.map((doc) => ({ path: doc.llmsPath, title: doc.title })),
        })),
        file: path.relative(ROOT, LLM_JSONL_PATH).replace(/\\/g, '/'),
        urlPrefix: `${SITE_URL}/${LLM_ROOT}`,
      },
      null,
      2,
    ),
    'utf8',
  );

  console.log(
    `Generated .llmtemp/llm.jsonl (${docs.length} pages, ${curatedDocs.length} curated) for LLM use.`,
  );
}

main();
