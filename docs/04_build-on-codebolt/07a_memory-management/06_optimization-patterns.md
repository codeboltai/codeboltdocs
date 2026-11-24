---
sidebar_position: 6
title: Optimization Patterns
description: Practical recipes for keeping memory lean, relevant, and fast. These patterns combine the hook system, action blocks, ingestion pipelines, and direct SDK calls.
---

# Optimization Patterns

Practical recipes for keeping memory lean, relevant, and fast. These patterns combine the hook system, action blocks, ingestion pipelines, and direct SDK calls.

---

## Pattern 1 — Session summarization

**Problem:** Episodic memory grows without bound across sessions. Older turns dilute context quality and slow retrieval.

**Solution:** At the end of each thread, an action block summarizes the session's key decisions into a compact markdown note and embeddings, and writes the summary through a configured ingestion pipeline. Supply `memoryId` and `pipelineId` as action-block parameters.

**Hook:**

```json
{
  "name": "session-summarize",
  "enabled": true,
  "when": { "type": "threadCompleted", "agentTypeFilter": "main" },
  "then": { "type": "runActionBlock", "actionBlockId": "session-summarizer" }
}
```

**Action block (`session-summarizer/index.js`):**

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onActionBlockInvocation(async ({ params }) => {
  const { memoryId } = params;
  const response = await codebolt.episodicMemory.queryEvents({ memoryId, lastMinutes: 60 });
  if (!response.success || !response.data) throw new Error('Could not read episodic events');
  const { completion } = await codebolt.llm.inference({
    input: [{ type: 'message', role: 'user',
      content: 'Summarize these events as Markdown: ' + JSON.stringify(response.data.events) }],
  });
  if (!completion.output_text) throw new Error('The model returned no summary');
  const write = await codebolt.memoryIngestion.execute({
    pipelineId: params.pipelineId, payload: { text: completion.output_text, memoryId },
  });
  if (!write.success) throw new Error('Summary ingestion failed');
  return { summary: completion.output_text };
});
```

## Pattern 2 — Vector store pruning

**Problem:** The vector store accumulates duplicate or outdated embeddings over time, degrading search precision.

**Solution:** A scheduled action block (triggered by a `gitPush` hook or `manual` ingestion trigger) prunes low-quality chunks.

**Action block (`vector-pruner/index.js`):**

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onActionBlockInvocation(async ({ params }) => {
  const url = 'http://localhost:2719/vectorDB/collections/' +
    encodeURIComponent(params.collectionId) + '/documents';
  const response = await fetch(url);
  if (!response.ok) throw new Error(await response.text());
  const { data: documents } = await response.json();
  const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const candidates = documents.filter(doc => Date.parse(doc.metadata?.date) < cutoff);
  // Inspect the candidates first. Set apply explicitly to delete these URIs.
  if (params.apply === true) {
    for (const { uri } of candidates) {
      const removed = await fetch(url, { method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ uri }) });
      if (!removed.ok) throw new Error(await removed.text());
    }
  }
  return { candidates: candidates.map(doc => doc.uri) };
});
```

**Hook:**

```json
{
  "name": "prune-vectors-on-push",
  "enabled": true,
  "when": { "type": "gitPush", "branches": ["main"] },
  "then": {
    "type": "runActionBlock",
    "actionBlockId": "vector-pruner"
  }
}
```

---

## Pattern 3 — Knowledge graph deduplication

**Problem:** Multiple ingestion runs create duplicate entity records in the knowledge graph (e.g., the same function extracted twice with slightly different names).

**Solution:** An action block queries for near-duplicate nodes and merges them.

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onActionBlockInvocation(async ({ params: { instanceId } }) => {
  // Find all Function nodes
  const response = await codebolt.knowledgeGraph.listMemoryRecords(instanceId, { kind: 'Function' });

  if (!response.success || !response.data) throw new Error("Could not list records");
  const records = response.data;

  // Group by normalized name
  const groups = {};
  for (const record of records) {
    const key = record.attributes.name?.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!key) continue;
    if (!groups[key]) groups[key] = [];
    groups[key].push(record);
  }

  let merged = 0;
  for (const [, group] of Object.entries(groups)) {
    if (group.length < 2) continue;

    // Keep the most recent; delete duplicates
    group.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    for (const duplicate of group.slice(1)) {
      await codebolt.knowledgeGraph.deleteMemoryRecord(instanceId, duplicate.id);
      merged++;
    }
  }

  return { merged };
});
```

---

## Pattern 4 — Adaptive context rules

**Problem:** A static context rule that always includes the architecture notes wastes tokens when the task is a simple bug fix.

**Solution:** An agent monitors its own context quality (via the assembly trace) and updates rules dynamically.

```typescript
const response = await codebolt.contextAssembly.getContext({
  scope_variables: { threadId }, input: 'Summarize the project architecture',
  constraints: { max_tokens: 800 },
});
if (!response.success) throw new Error(response.error || 'Assembly failed');
console.log(response.data?.context.total_tokens, response.data?.context.warnings);
```

Repeat the request with a different token budget and compare the returned context.

## Pattern 5 — KV store cache invalidation

**Problem:** An agent caches expensive computations in KV, but the cache becomes stale when the underlying data changes.

**Solution:** A file-change hook invalidates the relevant KV namespace.

**Hook:**

```json
{
  "name": "invalidate-schema-cache",
  "enabled": true,
  "when": {
    "type": "fileUpdated",
    "patterns": ["prisma/schema.prisma", "src/models/**/*.ts"]
  },
  "then": {
    "type": "runActionBlock",
    "actionBlockId": "cache-invalidator"
  }
}
```

**Action block:**

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onActionBlockInvocation(async ({ params: { instanceId } }) => {
  await codebolt.kvStore.deleteNamespace(instanceId, 'schema-cache');
  return { invalidated: 'schema-cache' };
});
```

---

## Pattern 6 — Self-tuning retrieval pipeline

**Problem:** The `topK` and `minScore` for a vector search were set at pipeline creation time and haven't been validated against real usage.

**Solution:** Run an eval suite that measures retrieval quality, then let the optimizer adjust those parameters.

```typescript
// Use evalRequest from the Memory Evaluation guide and an existing recall task.
const { run } = await evalRequest('/runs', 'POST', {
  taskId, subjects: [{ type: 'agent', name: 'Recall agent', referenceId: agentId }],
});
await evalRequest(`/runs/${run.id}/start`, 'POST');
```

Compare the scores for the same task before and after changing the retrieval settings. [Create a task and inspect optimization results](./05_memory-evaluation.md).

## Pattern 7 — Post-commit knowledge graph refresh

**Problem:** The knowledge graph is built from snapshots and goes stale as code evolves.

**Solution:** On every commit, an action block runs the TypeScript entity extractor over changed files only.

**Hook:**

```json
{
  "name": "kg-refresh-on-commit",
  "enabled": true,
  "when": { "type": "gitCommit", "creatorFilter": "any" },
  "then": { "type": "runActionBlock", "actionBlockId": "ts-entity-extractor" }
}
```

**Ingestion pipeline (used by the action block):**

```json
{
  "id": "kg-refresh-pipeline",
  "label": "Knowledge graph refresh from diff",
  "triggers": ["manual"],
  "processors": [
    { "id": "parse", "type": "parser", "input": "payload.code", "output": "ast", "format": "code", "language": "typescript" },
    { "id": "extract", "type": "llm_extract_kb", "input": "ast", "output": "entities",
      "prompt": "Extract function names, class names, and their relationships from this TypeScript AST.",
      "output_format": "graph", "kg_template_id": "code-entities-template" }
  ],
  "routes": [
    { "foreach": "entity", "write_to": "graph://" },
    { "foreach": "relationship", "write_to": "graph://" }
  ]
}
```

The action block reads the git diff, loops over changed `.ts` files, and calls `memoryIngestion.execute()` for each:

```javascript
import codebolt from '@codebolt/codeboltjs';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

codebolt.onActionBlockInvocation(async () => {
  const diff = execSync('git diff --diff-filter=ACM --name-only HEAD~1 HEAD').toString().trim().split('\n');
  const tsFiles = diff.filter(f => f.endsWith('.ts'));

  for (const file of tsFiles) {
    const code = readFileSync(file, 'utf-8');
    await codebolt.memoryIngestion.execute({
      pipelineId: 'kg-refresh-pipeline',
      payload: { code, filePath: file }
    });
  }

  return { refreshed: tsFiles.length };
});
```

---

## Choosing the right pattern

| Goal | Pattern |
|---|---|
| Keep context window lean over long sessions | Session summarization (#1) |
| Prevent vector search degradation | Vector pruning (#2) |
| Fix duplicate graph nodes | KG deduplication (#3) |
| Reduce token waste from noisy rules | Adaptive context rules (#4) |
| Invalidate stale cached data | KV cache invalidation (#5) |
| Improve retrieval quality automatically | Self-tuning pipeline (#6) |
| Keep knowledge graph current | Post-commit KG refresh (#7) |

## See also

- [Hooks and action blocks](./03_hooks-and-action-blocks.md) — event-driven automation
- [Memory Ingestion](./02f_memory-ingestion.md) — ingestion pipelines and processor types
- [Memory evaluation](./05_memory-evaluation.md) — measuring and optimizing retrieval quality
