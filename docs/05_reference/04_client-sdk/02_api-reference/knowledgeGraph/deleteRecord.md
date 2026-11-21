---
title: deleteRecord
---

# `deleteRecord`

```typescript
client.knowledgeGraph.deleteRecord(id: string, recordId: string): Promise<unknown>
```

Deletes a record from a knowledge graph instance.

Removes the node and any edges connected to it. This may affect
the connectivity of the graph.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the graph instance |
| `recordId` | `string` | Yes | The unique identifier of the record to delete |

## Returns

`Promise<unknown>` — A promise that resolves when deletion is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledgeGraph.deleteRecord('id', 'recordId');
console.log(result);
```
