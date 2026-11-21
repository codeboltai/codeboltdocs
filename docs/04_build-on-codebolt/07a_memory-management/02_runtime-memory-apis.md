---
sidebar_position: 2
title: Runtime Memory APIs
description: Every memory store and configuration layer is accessible via the codeboltjs SDK
---

# Runtime Memory APIs

Every memory store and configuration layer is accessible via the `codeboltjs` SDK. Agents can call these APIs inside their own execution loop — reading from storage, writing to it, and reconfiguring the pipelines that govern what they know.

Import the SDK in any agent or action block:

```typescript
import codebolt from '@codebolt/codeboltjs';
```

---

## Memory Ingestion — `codebolt.memoryIngestion`

Full CRUD control over ingestion pipelines at runtime. An agent can create a new pipeline in response to what it learns, activate or disable existing ones, and trigger manual ingestion runs.

```typescript
// Create a pipeline that embeds every completed task
const pipeline = await codebolt.memoryIngestion.create({
  id: 'task-completion-embed',
  label: 'Embed task completions',
  trigger: 'onTaskCompleted',
  processors: [
    { id: 'c1', type: 'chunker', input: 'payload.summary', output: 'chunks', chunk_size: 400, overlap: 50 },
    { id: 'e1', type: 'vector_embed', input: 'chunks', output: 'embedded', model: 'default' }
  ],
  routing: [{ foreach: 'chunk', write_to: 'vector://task-history' }]
});

// List all active pipelines
const { pipelines } = await codebolt.memoryIngestion.list({ activeOnly: true });

// Update a pipeline's chunk size
await codebolt.memoryIngestion.update('task-completion-embed', {
  processors: [{ id: 'c1', chunk_size: 256 }]
});

// Activate / disable
await codebolt.memoryIngestion.activate('task-completion-embed');
await codebolt.memoryIngestion.disable('task-completion-embed');

// Trigger manually with a payload
await codebolt.memoryIngestion.execute({
  pipelineId: 'task-completion-embed',
  payload: { summary: 'Implemented OAuth2 login flow using Passport.js' }
});

// Duplicate a pipeline with a new ID
await codebolt.memoryIngestion.duplicate('task-completion-embed', 'session-completion-embed', 'Embed session completions');

// Validate configuration before saving
const { valid, errors } = await codebolt.memoryIngestion.validate(draftConfig);
```

**Get processor specs** (what processor types are available and their parameter schemas):

```typescript
const { specs } = await codebolt.memoryIngestion.getProcessorSpecs();
```

---

## Persistent Memory — `codebolt.persistentMemory`

Create and modify retrieval definitions that context assembly can select for a request.

```typescript
// Define a new retrieval pipeline
await codebolt.persistentMemory.create({
  id: 'recent-errors',
  name: 'Recent error context',
  enabled: true,
  inputScope: 'task',
  pipeline: [
    { step: 'derive_query', from: 'task.text', method: 'keyword_extract' },
    { step: 'log_search', eventType: 'error', since: '-24h', limit: 10 },
    { step: 'format', template: '## Recent errors\n{{#each results}}\n- {{this.payload}}\n{{/each}}' }
  ]
});

// Activate / update a retrieval pipeline
await codebolt.persistentMemory.update('recent-errors', { enabled: false });

// Trigger retrieval outside the normal assembly cycle
const { result } = await codebolt.persistentMemory.executeRetrieval('recent-errors', {
  task: { text: 'Fix the authentication bug' }
});

// Discover available step types
const { specs } = await codebolt.persistentMemory.getStepSpecs();
```

---

## Context Rule Engine — `codebolt.contextRuleEngine`

Add, update, and evaluate context rules at runtime. Rules take effect on the next turn.

```typescript
// Create a rule that injects style guide when task mentions "PR"
await codebolt.contextRuleEngine.create({
  name: 'pr-style-guide',
  enabled: true,
  conditions: [{ field: 'task.text', op: 'contains', value: 'PR' }],
  actions: [{ type: 'include', reference: 'markdown://style-guide' }]
});

// Update an existing rule
await codebolt.contextRuleEngine.update('pr-style-guide', {
  conditions: [
    { field: 'task.text', op: 'contains', value: 'PR' },
    { field: 'task.text', op: 'contains', value: 'review' }
  ]
});

// Test rules against a hypothetical context without affecting live assembly
const { matches } = await codebolt.contextRuleEngine.evaluate({
  rules: ['pr-style-guide'],
  variables: { task: { text: 'Please review this PR' } }
});

// Find out what variables rules can reference
const { variables } = await codebolt.contextRuleEngine.getPossibleVariables();
```

---

## Context Assembly — `codebolt.contextAssembly`

Assemble context on demand, test it, or inspect what memory types are available.

```typescript
// Assemble context for an arbitrary query
const { context } = await codebolt.contextAssembly.getContext({
  task: { text: 'How does the payment flow work?' },
  memoryNames: ['recent-decisions', 'code-context-recall'],
  tokenBudget: 4000
});

// Validate a request before running
const { valid, errors } = await codebolt.contextAssembly.validate(request);

// List all available memory types
const { memoryTypes } = await codebolt.contextAssembly.listMemoryTypes();

// Test which rules match without doing full retrieval
const { matched } = await codebolt.contextAssembly.evaluateRules(request, ['pr-style-guide']);

// Find what scope variables a set of memory definitions requires
const { required } = await codebolt.contextAssembly.getRequiredVariables(['recent-errors', 'code-context-recall']);
```

---

## KV Store — `codebolt.kvStore`

Namespaced key-value storage. Agents use this to persist small values that must survive across runs.

```typescript
// Create a named instance (or use an existing one)
const instance = await codebolt.kvStore.createInstance('agent-prefs', 'Agent preferences');

// Write a value
await codebolt.kvStore.set(instance.id, 'user', 'preferred_language', 'TypeScript', true);
// true = auto-create instance if it doesn't exist

// Read a value
const { value } = await codebolt.kvStore.get(instance.id, 'user', 'preferred_language');

// Delete a single key
await codebolt.kvStore.delete(instance.id, 'user', 'preferred_language');

// Wipe an entire namespace
await codebolt.kvStore.deleteNamespace(instance.id, 'session-cache');

// Query with a DSL
const { records } = await codebolt.kvStore.query({
  instanceId: instance.id,
  namespace: 'user',
  filter: { key: { startsWith: 'preferred_' } }
});

// Inspect store shape
const { namespaces } = await codebolt.kvStore.getNamespaces(instance.id);
const { count } = await codebolt.kvStore.getRecordCount(instance.id, 'user');
```

---

## Vector Store — `codebolt.vectordb`

Direct access to semantic embeddings. Most agents let the ingestion pipeline manage writes; direct writes are useful for one-off embeds or targeted deletions.

```typescript
// Upsert a document (chunked automatically by the store)
await codebolt.vectordb.upsertDocument('my-collection', {
  uri: 'note://architecture-decision-2',
  text: 'We chose Kuzu as the graph database because it embeds cleanly and supports Cypher.',
  metadata: { type: 'decision', date: '2025-04-22' }
});

// Semantic search
const { results } = await codebolt.vectordb.queryDocuments('my-collection', {
  query: 'why did we choose the graph database?',
  topK: 5,
  minScore: 0.75
});

// Delete a document by URI
await codebolt.vectordb.deleteDocument('my-collection', 'note://architecture-decision-2');

// Manage a chunk directly
await codebolt.vectordb.addChunk('my-collection', { content: 'Raw chunk text', metadata: {} });
await codebolt.vectordb.deleteChunk('my-collection', chunkId);
```

**Collection management:**

```typescript
await codebolt.vectordb.createCollection({ name: 'task-history', embeddingModel: 'default' });
await codebolt.vectordb.updateCollection('task-history', { description: 'Completed task summaries' });
await codebolt.vectordb.deleteCollection('task-history');
```

---

## Knowledge Graph — `codebolt.knowledgeGraph`

Full CRUD on nodes (memory records), edges (relationships), templates, and Cypher views.

```typescript
// Create a graph instance from a schema template
const instance = await codebolt.knowledgeGraph.createInstance({
  name: 'project-entities',
  templateId: 'code-entities-template'
});

// Add nodes
await codebolt.knowledgeGraph.addMemoryRecord(instance.id, {
  kind: 'Function',
  data: { name: 'processPayment', signature: 'async (amount: number) => Promise<Receipt>' }
});

// Add relationships
await codebolt.knowledgeGraph.addEdge(instance.id, {
  type: 'CALLS',
  fromRecordId: 'fn-processPayment',
  toRecordId: 'fn-chargeStripe'
});

// Create and execute a saved Cypher view
await codebolt.knowledgeGraph.createView({
  instanceId: instance.id,
  name: 'payment-call-chain',
  query: 'MATCH p=(f:Function)-[:CALLS*]->(g:Function {name: "chargeStripe"}) RETURN p'
});
const { rows } = await codebolt.knowledgeGraph.executeView('payment-call-chain');

// Delete stale records
await codebolt.knowledgeGraph.deleteMemoryRecord(instance.id, 'fn-legacyCharge');
```

---

## Episodic Memory — `codebolt.episodicMemory`

Append structured events to an immutable timeline. Useful for agents that need to log their own reasoning or actions for later retrieval.

```typescript
// Create a memory container for this run
const memory = await codebolt.episodicMemory.createMemory({ title: 'Refactor run 2025-04-22' });

// Append events
await codebolt.episodicMemory.appendEvent({
  memoryId: memory.id,
  event: {
    event_type: 'decision',
    emitting_agent_id: 'refactor-agent',
    tags: ['architecture', 'payment'],
    payload: { decision: 'Extract PaymentService to its own module', rationale: 'SRP' }
  }
});

// Query by type, tag, or time window
const { events } = await codebolt.episodicMemory.queryEvents({
  memoryId: memory.id,
  filters: { event_type: 'decision', tags: ['payment'], lastMinutes: 60 }
});

// Archive old runs
await codebolt.episodicMemory.archiveMemory({ memoryId: memory.id });
```

---

## Markdown & JSON Memory — `codebolt.memory`

Human-readable notes and structured JSON records.

```typescript
// Markdown — save and update long-form notes
const note = await codebolt.memory.markdown.save(
  '## Payment module decisions\n\nWe extracted PaymentService for SRP...',
  { tags: ['architecture', 'payment'] }
);
await codebolt.memory.markdown.update(note.id, '## Updated notes\n...', { tags: ['architecture'] });

// JSON — save structured state
const record = await codebolt.memory.json.save({ completedModules: ['auth', 'payment'], currentModule: 'notifications' });
await codebolt.memory.json.update(record.id, { currentModule: 'reporting' });

// List with filters
const notes = await codebolt.memory.markdown.list({ tags: ['architecture'] });
```
