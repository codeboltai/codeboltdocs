---
title: addChunks
---

# `addChunks`

```typescript
client.vectorDb.addChunks(id: string, data: AddVectorChunksRequest): Promise<unknown>
```

Adds chunks to a vector collection.

Manually adds pre-chunked text segments to the collection with their
embeddings. This is useful when you have custom chunking logic or
want to add chunks without full document processing.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the target collection |
| `data` | `AddVectorChunksRequest` | Yes | The chunks to add with their embeddings and metadata |

## Returns

`Promise<unknown>` — A promise that resolves when chunks have been added

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.vectorDb.addChunks('id', /* AddVectorChunksRequest */);
console.log(result);
```
