---
title: deleteCollection
---

# `deleteCollection`

```typescript
client.vectorDb.deleteCollection(id: string): Promise<unknown>
```

Deletes a vector collection.

Permanently removes a collection and all its associated data including
documents, chunks, and index information. This operation cannot be undone.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the collection to delete |

## Returns

`Promise<unknown>` — A promise that resolves when the collection has been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.vectorDb.deleteCollection('id');
console.log(result);
```
