---
title: query
---

# `query`

```typescript
client.vectorDb.query(id: string, data: VectorQueryRequest): Promise<VectorSearchResult[]>
```

Queries a vector collection for similar documents.

Performs semantic similarity search using a query vector or text.
Returns documents or chunks ranked by similarity score, enabling
retrieval of contextually relevant content for RAG applications.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the collection to query |
| `data` | `VectorQueryRequest` | Yes | The query configuration including vector or text and search parameters |

## Returns

`Promise<VectorSearchResult[]>` — A promise that resolves to an array of VectorSearchResult objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.vectorDb.query('id', /* VectorQueryRequest */);
console.log(result);
```
