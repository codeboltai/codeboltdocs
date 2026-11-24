---
sidebar_position: 2
title: Runtime Memory APIs
description: Read, write, and retrieve project memory from a Codebolt agent.
---

# Runtime Memory APIs

These examples run inside a connected agent or action block. Use IDs from the current project.

```js
import codebolt from '@codebolt/codeboltjs';
```

## Memory Ingestion — `codebolt.memoryIngestion`

Create a manual pipeline once, or use the ID of an existing active pipeline with the same inputs. This example saves review decisions by ID in the KV store.

```js
const created = await codebolt.memoryIngestion.create({
  id: 'review-decisions', label: 'Review decisions', trigger: 'manual',
  processors: [{
    id: 'parse', type: 'parser', input: 'event.payload.record',
    output: 'record', params: { format: 'json' },
  }],
  routing: [{ from: 'record', write_to: { type: 'kv', instanceId: 'reviews', namespace: 'decisions' } }],
});
if (!created.success) throw new Error(created.error);
const pipelineId = created.data.pipeline.id;
const active = await codebolt.memoryIngestion.activate(pipelineId);
if (!active.success) throw new Error(active.error);
```

Send the same payload you would use in the [desktop ingestion example](../../02_using-codebolt/05d_memory/06_memory-ingestion.md).

```js
const write = await codebolt.memoryIngestion.execute({
  pipelineId, payload: { record: JSON.stringify({ id: 'review-1', decision: 'accepted' }) },
});
if (!write.success) throw new Error(write.error);
console.log(write.data.result);
```

Use `list()` to find pipelines under `data.pipelines`. See [Memory Ingestion](./02f_memory-ingestion.md) for triggers and destinations.

## Persistent Memory — `codebolt.persistentMemory`

Run a configured retrieval pipeline by its memory definition ID. Supply the variables that definition expects.

```js
const read = await codebolt.persistentMemory.executeRetrieval(memoryId, {
  query: 'Which review decisions were accepted?',
});
if (!read.success) throw new Error(read.error);
console.log(read.data.result);
```

Use `list()` to find definitions under `data.memories`. See [Persistent Memory](./02d_persistent-memory.md) for retrieval steps.

## Context Rule Engine — `codebolt.contextRuleEngine`

Test the rules for a planning request before running retrieval.

```js
const rules = await codebolt.contextRuleEngine.evaluate({
  scope_variables: {}, additional_variables: { phase: 'planning' },
});
if (!rules.success) throw new Error(rules.error);
console.log(rules.data);
```

## Context Assembly — `codebolt.contextAssembly`

Use the thread ID and a persistent memory definition ID from your project.

```js
const response = await codebolt.contextAssembly.getContext({
  scope_variables: { thread: { thread_id: threadId } },
  explicit_memory: [memoryId],
  constraints: { max_tokens: 800 },
});
if (!response.success) throw new Error(response.error);
const assembled = response.data.context;
console.log(assembled.context, assembled.trace, assembled.meta);
```

See [Context Assembly](./02g_context-assembly.md) for rule-based selection and [Context Compaction](./02h_context-compaction.md) for reducing conversation history.

## KV Store — `codebolt.kvStore`

Store a preference under a key in an existing instance.

```js
await codebolt.kvStore.set(instanceId, 'preferences', 'theme', 'dark');
const saved = await codebolt.kvStore.get(instanceId, 'preferences', 'theme');
if (saved.data?.exists) console.log(saved.data.value);
```

See [KV Store](./02e_kv-store.md#sdk-reference) to create an instance and query records.

## Vector Store — `codebolt.vectordb`

Use `codebolt.vectordb` for vector-item operations inside an agent.

```ts
const vector = await codebolt.vectordb.getVector('architecture-decision');
```

To manage a document collection, use the server’s `/vectorDB/collections` API. For example, to update a collection’s description, send `PUT /vectorDB/collections/:id` with `{"description":"Completed task summaries"}`. Delete a collection with `DELETE /vectorDB/collections/:id`. The [Vector DB examples](./02a_vector-db.md#sdk-reference) show how to create a collection, index and query documents, and add or remove chunks.

## Knowledge Graph — `codebolt.knowledgeGraph`

List records of a kind defined by your graph's instance template.

```js
const records = await codebolt.knowledgeGraph.listMemoryRecords(instanceId, { kind: 'Module' });
if (!records.success) throw new Error(records.error);
console.log(records.data);
```

See [Knowledge Graph](./02c_knowledge-graph.md#sdk-reference) to define a template, add records and edges, and query a view.

## Episodic Memory — `codebolt.episodicMemory`

Create a memory thread, append a decision, and read it back.

```js
const created = await codebolt.episodicMemory.createMemory({ title: 'Payment module decisions' });
if (!created.success) throw new Error(created.error);
const memoryId = created.data.id;
const appended = await codebolt.episodicMemory.appendEvent({
  memoryId, event_type: 'decision', emitting_agent_id: agentId,
  payload: { decision: 'Extract PaymentService' },
});
if (!appended.success) throw new Error(appended.error);
const recent = await codebolt.episodicMemory.queryEvents({ memoryId, event_type: 'decision', lastCount: 10 });
if (recent.success) console.log(recent.data.events);
```

Use `archiveMemory({ memoryId })` when you want to archive this thread.

## Markdown & JSON Memory — `codebolt.memory`

The application manages Markdown and JSON as memory threads. The example below uses the desktop server's thread endpoints. Set the server address to the one serving your project.

```js
const base = 'http://localhost:2719/memories';
async function writeMemory(path, method, body) {
  const response = await fetch(base + path, {
    method, headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(await response.text());
  return (await response.json()).thread;
}

const noteId = crypto.randomUUID();
await writeMemory('/markdown/threads', 'POST', { threadId: noteId, title: 'Payment decisions' });
await writeMemory('/markdown/threads/' + noteId + '/content', 'PUT', {
  content: '## Decision\nExtract PaymentService.',
});

const recordId = crypto.randomUUID();
await writeMemory('/json/threads', 'POST', { threadId: recordId, title: 'Module status' });
await writeMemory('/json/threads/' + recordId + '/data', 'PUT', {
  data: { module: 'payments', status: 'reviewed' },
});
```

Reuse the thread ID to update its contents. To list thread types, including to-do and context threads, use `GET /memories/threads`.
