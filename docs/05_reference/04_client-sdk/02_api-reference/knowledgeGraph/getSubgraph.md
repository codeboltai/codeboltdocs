---
title: getSubgraph
---

# `getSubgraph`

```typescript
client.knowledgeGraph.getSubgraph(id: string, params?: KGSubgraphParams): Promise<unknown>
```

Retrieves a subgraph of a knowledge graph instance.

Returns a portion of the graph centered around specified nodes or
matching certain criteria. Useful for visualizing local neighborhoods
without loading the entire graph.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the graph instance |
| `params` | `KGSubgraphParams` | No | Optional parameters controlling subgraph scope (e.g., center node, depth) |

## Returns

`Promise<unknown>` — A promise that resolves to the subgraph data including records and edges

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledgeGraph.getSubgraph('id');
console.log(result);
```
