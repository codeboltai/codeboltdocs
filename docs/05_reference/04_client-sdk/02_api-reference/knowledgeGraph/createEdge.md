---
title: createEdge
---

# `createEdge`

```typescript
client.knowledgeGraph.createEdge(id: string, data: CreateKGEdgeRequest): Promise<KGEdge>
```

Creates a new edge (relationship) in a knowledge graph instance.

Edges connect two records with a typed relationship, forming the
graph structure. Each edge has a source record, target record,
and relationship type.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the graph instance |
| `data` | `CreateKGEdgeRequest` | Yes | Edge creation payload including source, target, and relationship type |

## Returns

`Promise<KGEdge>` — A promise that resolves to the newly created

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledgeGraph.createEdge('id', /* CreateKGEdgeRequest */);
console.log(result);
```
