---
title: getDocument
---

# `getDocument`

```typescript
client.knowledge.getDocument(documentId: string): Promise<KnowledgeDocument>
```

Retrieves a specific document by its ID.

Returns the full details of a document including its metadata,
processing status, and chunk count.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `documentId` | `string` | Yes | The unique identifier of the document |

## Returns

`Promise<KnowledgeDocument>` — A promise that resolves to the

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledge.getDocument('documentId');
console.log(result);
```
