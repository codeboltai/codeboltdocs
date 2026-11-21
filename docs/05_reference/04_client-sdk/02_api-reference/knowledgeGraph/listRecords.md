---
title: listRecords
---

# `listRecords`

```typescript
client.knowledgeGraph.listRecords(id: string, params?: Record<string, unknown>): Promise<KGRecord[]>
```

Lists all records in a knowledge graph instance.

Returns the nodes in the graph with their types and properties.
Use optional parameters to filter by type or paginate results.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the graph instance |
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

## Returns

`Promise<KGRecord[]>` — A promise that resolves to an array of  objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledgeGraph.listRecords('id');
console.log(result);
```
