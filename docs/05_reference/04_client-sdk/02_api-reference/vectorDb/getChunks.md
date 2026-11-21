---
title: getChunks
---

# `getChunks`

```typescript
client.vectorDb.getChunks(id: string, params?: Record<string, unknown>): Promise<VectorChunk[]>
```

Retrieves chunks from a vector collection.

Fetches text chunks that were created when documents were processed.
Chunks are smaller segments of documents used for more granular
similarity search and retrieval operations.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the collection |
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

## Returns

`Promise<VectorChunk[]>` — A promise that resolves to an array of VectorChunk objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.vectorDb.getChunks('id');
console.log(result);
```
