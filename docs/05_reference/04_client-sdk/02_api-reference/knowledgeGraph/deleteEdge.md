---
title: deleteEdge
---

# `deleteEdge`

```typescript
client.knowledgeGraph.deleteEdge(id: string, edgeId: string): Promise<unknown>
```

Deletes an edge from a knowledge graph instance.

Removes the relationship between two records. The records
themselves are not affected.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the graph instance |
| `edgeId` | `string` | Yes | The unique identifier of the edge to delete |

## Returns

`Promise<unknown>` — A promise that resolves when deletion is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledgeGraph.deleteEdge('id', 'edgeId');
console.log(result);
```
