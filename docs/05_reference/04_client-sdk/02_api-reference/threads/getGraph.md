---
title: getGraph
---

# `getGraph`

```typescript
client.threads.getGraph(): Promise<ThreadGraphNode[]>
```

Retrieves the complete thread graph structure.

Returns all threads as nodes in a graph representation, showing relationships
and connections between threads. This is useful for visualizing thread
hierarchies and dependencies.

## Parameters

_No parameters._

## Returns

`Promise<ThreadGraphNode[]>` — A promise that resolves to an array of ThreadGraphNode objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threads.getGraph();
console.log(result);
```
