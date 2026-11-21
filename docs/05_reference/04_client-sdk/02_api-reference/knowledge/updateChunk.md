---
title: updateChunk
---

# `updateChunk`

```typescript
client.knowledge.updateChunk(chunkId: string, data: UpdateKnowledgeChunkRequest): Promise<unknown>
```

Updates a specific chunk's content or metadata.

Modifies an individual chunk within a document. Useful for
correcting chunking artifacts or adding manual annotations.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `chunkId` | `string` | Yes | The unique identifier of the chunk to update |
| `data` | `UpdateKnowledgeChunkRequest` | Yes | The fields to update on the chunk |

## Returns

`Promise<unknown>` — A promise that resolves when the chunk has been updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledge.updateChunk('chunkId', /* UpdateKnowledgeChunkRequest */);
console.log(result);
```
