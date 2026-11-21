---
title: deleteChunk
---

# `deleteChunk`

```typescript
client.vectorDb.deleteChunk(id: string, chunkId: string): Promise<unknown>
```

Deletes a specific chunk from a vector collection.

Removes a single chunk by its unique identifier. This is useful for
granular cleanup when individual chunks need to be removed without
affecting other content in the collection.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the collection |
| `chunkId` | `string` | Yes | The unique identifier of the chunk to delete |

## Returns

`Promise<unknown>` — A promise that resolves when the chunk has been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.vectorDb.deleteChunk('id', 'chunkId');
console.log(result);
```
