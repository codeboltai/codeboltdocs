---
title: expandNode
---

# `expandNode`

```typescript
client.knowledgeGraph.expandNode(id: string, data: ExpandNodeRequest): Promise<unknown>
```

Expands a node to reveal its immediate connections.

Starting from a specific record, returns all directly connected
records and the edges linking them. Useful for interactive graph
exploration where users progressively reveal the graph structure.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the graph instance |
| `data` | `ExpandNodeRequest` | Yes | Expansion parameters specifying which node to expand and direction |

## Returns

`Promise<unknown>` — A promise that resolves to the connected records and edges

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledgeGraph.expandNode('id', /* ExpandNodeRequest */);
console.log(result);
```
