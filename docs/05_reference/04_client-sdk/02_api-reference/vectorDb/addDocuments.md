---
title: addDocuments
---

# `addDocuments`

```typescript
client.vectorDb.addDocuments(id: string, data: AddVectorDocumentsRequest): Promise<unknown>
```

Adds documents to a vector collection.

Ingests new documents into the collection, automatically generating
embeddings and storing them for similarity search. Documents can include
text content and metadata for filtering.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the target collection |
| `data` | `AddVectorDocumentsRequest` | Yes | The documents to add along with their metadata |

## Returns

`Promise<unknown>` — A promise that resolves when documents have been added

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.vectorDb.addDocuments('id', /* AddVectorDocumentsRequest */);
console.log(result);
```
