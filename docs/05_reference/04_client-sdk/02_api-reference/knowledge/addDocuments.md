---
title: addDocuments
---

# `addDocuments`

```typescript
client.knowledge.addDocuments(id: string, data: AddKnowledgeDocumentsRequest): Promise<unknown>
```

Adds one or more documents to a knowledge collection.

Uploads documents that will be automatically processed, chunked,
and indexed for retrieval. Supports multiple documents in a single request.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the target collection |
| `data` | `AddKnowledgeDocumentsRequest` | Yes | The documents to add, including their content and metadata |

## Returns

`Promise<unknown>` — A promise that resolves when the documents have been added and processing has begun

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledge.addDocuments('id', /* AddKnowledgeDocumentsRequest */);
console.log(result);
```
