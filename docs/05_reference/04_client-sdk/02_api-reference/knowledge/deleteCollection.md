---
title: deleteCollection
---

# `deleteCollection`

```typescript
client.knowledge.deleteCollection(id: string): Promise<unknown>
```

Deletes a knowledge collection and all its documents.

Permanently removes the collection, its documents, and all
associated chunks. This action cannot be undone.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the collection to delete |

## Returns

`Promise<unknown>` — A promise that resolves when deletion is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledge.deleteCollection('id');
console.log(result);
```
