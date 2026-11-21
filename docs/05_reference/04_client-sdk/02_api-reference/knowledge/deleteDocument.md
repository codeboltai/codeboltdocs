---
title: deleteDocument
---

# `deleteDocument`

```typescript
client.knowledge.deleteDocument(documentId: string): Promise<unknown>
```

Deletes a document and all its associated chunks.

Permanently removes the document from its collection. The collection
itself is not affected.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `documentId` | `string` | Yes | The unique identifier of the document to delete |

## Returns

`Promise<unknown>` — A promise that resolves when deletion is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledge.deleteDocument('documentId');
console.log(result);
```
