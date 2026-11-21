---
title: rechunkDocument
---

# `rechunkDocument`

```typescript
client.knowledge.rechunkDocument(documentId: string, data?: RechunkDocumentRequest): Promise<unknown>
```

Re-chunks a document using updated chunking settings.

Discards existing chunks and re-processes the document with the
current or specified chunking strategy. Useful after changing
collection settings or chunking parameters.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `documentId` | `string` | Yes | The unique identifier of the document to re-chunk |
| `data` | `RechunkDocumentRequest` | No | Optional parameters specifying the new chunking configuration |

## Returns

`Promise<unknown>` — A promise that resolves when re-chunking is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledge.rechunkDocument('documentId');
console.log(result);
```
