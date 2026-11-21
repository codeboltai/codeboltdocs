---
title: deleteDocuments
---

# `deleteDocuments`

```typescript
client.vectorDb.deleteDocuments(id: string, data?: DeleteVectorDocumentsRequest): Promise<unknown>
```

Deletes documents from a vector collection.

Removes specified documents from the collection based on provided
criteria such as document IDs or metadata filters. This operation
cleans up the collection and frees storage.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the collection |
| `data` | `DeleteVectorDocumentsRequest` | No | Optional deletion criteria for selecting documents to remove |

## Returns

`Promise<unknown>` — A promise that resolves when documents have been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.vectorDb.deleteDocuments('id');
console.log(result);
```
