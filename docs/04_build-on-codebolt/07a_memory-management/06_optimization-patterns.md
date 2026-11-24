---
sidebar_position: 6
title: Optimization Patterns
description: Practical recipes for keeping memory lean, relevant, and fast. These patterns combine the hook system, action blocks, ingestion pipelines, and direct SDK calls.
---

# Optimization Patterns

Use these checks when a memory query returns stale, duplicate, or unexpected information.

## Save a session summary

Follow the [session hook example](./03_hooks-and-action-blocks.md) to read recent episodic events and save a Markdown note. If you need to reduce the conversation history sent on subsequent turns, preview [context compaction](./02h_context-compaction.md).

## Review stale vector documents

List the documents in the affected collection. Use the source URI to identify the document you want to refresh. Upsert its current text using the same URI, or delete the document if you have removed the source. See the [Vector DB examples](./02a_vector-db.md#sdk-reference) for both operations.

## Find possible duplicate graph records

Pass a graph instance ID to this custom action block. It returns groups of similarly named functions for review. Functions in different files can legitimately share a name.

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onActionBlockInvocation(async ({ params: { instanceId } }) => {
  // Find all Function nodes
  const response = await codebolt.knowledgeGraph.listMemoryRecords(instanceId, { kind: 'Function' });

  if (!response.success || !response.data) throw new Error("Could not list records");
  const records = response.data;

  // Group by normalized name
  const groups = Object.create(null);
  for (const record of records) {
    const key = record.attributes.name?.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!key) continue;
    if (!groups[key]) groups[key] = [];
    groups[key].push(record);
  }

  return { candidates: Object.values(groups).filter(group => group.length > 1) };
});
```

## Compare context budgets

Run the same request twice with the same memory definition and thread. Inspect which items fit in each budget.

```js
for (const max_tokens of [400, 800]) {
  const response = await codebolt.contextAssembly.getContext({
    scope_variables: { thread: { thread_id: threadId } },
    explicit_memory: [memoryId], constraints: { max_tokens },
  });
  if (!response.success) throw new Error(response.error);
  const assembled = response.data.context;
  console.log(max_tokens, assembled.context, assembled.trace, assembled.meta);
}
```

## Invalidate a cached value

When your agent updates a source, clear the corresponding cache key after the update succeeds. This example assumes your agent stores the parsed schema under `schema-cache/current`.

```js
const cleared = await codebolt.kvStore.delete(instanceId, 'schema-cache', 'current');
if (!cleared.success) throw new Error(cleared.error);
console.log(cleared.data.deleted);
```

## Test a retrieval change

Use a known fact in project memory to create a [recall evaluation](./05_memory-evaluation.md). Run the same task before and after editing your retrieval definition. Compare both the answer and the assembly trace to see whether the expected record was retrieved.
