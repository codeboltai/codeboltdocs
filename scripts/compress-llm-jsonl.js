const fs = require('fs');
const path = require('path');
const { createHash } = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const LLM_TEMP_DIR = path.join(ROOT, '.llmtemp');
const LLM_TEMP_ROOT = path.join(LLM_TEMP_DIR, 'llms');
const LLM_JSONL_PATH = path.join(LLM_TEMP_DIR, 'llm.jsonl');
const LLM_MANIFEST_PATH = path.join(LLM_TEMP_DIR, 'llm-manifest.json');

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function createDigest(text) {
  return createHash('sha256').update(text, 'utf8').digest('hex');
}

function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = { sourceDir: LLM_TEMP_ROOT };

  for (const arg of args) {
    if (arg.startsWith('--source=')) {
      parsed.sourceDir = arg.split('=', 2)[1];
    }
  }

  if (parsed.sourceDir.startsWith('.')) {
    parsed.sourceDir = path.resolve(ROOT, parsed.sourceDir);
  }

  return parsed;
}

function readJsonl(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function toContentPath(sourceDir, llmsPath) {
  return path.join(sourceDir, ...llmsPath.replace(/\\/g, '/').split('/'));
}

function main() {
  const { sourceDir } = parseArgs();

  if (!fs.existsSync(LLM_JSONL_PATH)) {
    throw new Error(`Missing llm.jsonl at ${LLM_JSONL_PATH}. Run generate:llms first.`);
  }

  const entries = readJsonl(LLM_JSONL_PATH);
  const baseDir = sourceDir;

  if (!fs.existsSync(baseDir)) {
    throw new Error(`Missing expanded source directory at ${baseDir}. Run expand:llm first.`);
  }

  const updated = entries.map((entry) => {
    const contentPath = toContentPath(baseDir, entry.llmsPath);
    if (!fs.existsSync(contentPath)) {
      console.log(`Warning: missing edited file for ${entry.llmsPath}, keeping previous markdown.`);
      return entry;
    }

    const markdown = fs.readFileSync(contentPath, 'utf8');
    return {
      ...entry,
      markdown,
      digest: createDigest(markdown),
    };
  }
  );

  const serialized = updated.map((entry) => JSON.stringify(entry)).join('\n');
  ensureDir(LLM_TEMP_DIR);
  fs.writeFileSync(LLM_JSONL_PATH, `${serialized}\n`, 'utf8');

  if (fs.existsSync(LLM_MANIFEST_PATH)) {
    const manifest = JSON.parse(fs.readFileSync(LLM_MANIFEST_PATH, 'utf8'));
    manifest.generatedAt = new Date().toISOString();
    fs.writeFileSync(
      LLM_MANIFEST_PATH,
      JSON.stringify(manifest, null, 2),
      'utf8',
    );
  } else {
    fs.writeFileSync(
      LLM_MANIFEST_PATH,
      JSON.stringify({ generatedAt: new Date().toISOString(), sourceCount: entries.length }, null, 2),
      'utf8',
    );
  }

  console.log(
    `Rebuilt ${path.relative(ROOT, LLM_JSONL_PATH)} from ${path.relative(ROOT, baseDir)}.`,
  );
}

main();
