---
title: listEdges
---

# `listEdges`

```typescript
client.knowledgeGraph.listEdges(id: string, params?: Record<string, unknown>): Promise<KGEdge[]>
```

Lists all edges in a knowledge graph instance.

Returns the relationships between records with their types and
endpoint references. Use optional parameters to filter by type.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the graph instance |
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

## Returns

`Promise<KGEdge[]>` — A promise that resolves to an array of  objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledgeGraph.listEdges('id');
console.log(result);
```
