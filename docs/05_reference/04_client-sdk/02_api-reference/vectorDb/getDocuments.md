---
title: getDocuments
---

# `getDocuments`

```typescript
client.vectorDb.getDocuments(id: string, params?: Record<string, unknown>): Promise<VectorDocument[]>
```

Retrieves documents from a vector collection.

Fetches documents stored in the collection with optional filtering and
pagination parameters. Use this to inspect stored content or retrieve
specific documents by criteria.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the collection |
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

## Returns

`Promise<VectorDocument[]>` — A promise that resolves to an array of VectorDocument objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.vectorDb.getDocuments('id');
console.log(result);
```
