---
title: deleteInstance
---

# `deleteInstance`

```typescript
client.knowledgeGraph.deleteInstance(id: string): Promise<unknown>
```

Deletes a knowledge graph instance and all its data.

Permanently removes the instance including all records, edges, and
associated views. This action cannot be undone.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the instance to delete |

## Returns

`Promise<unknown>` — A promise that resolves when deletion is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledgeGraph.deleteInstance('id');
console.log(result);
```
