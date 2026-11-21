---
title: listCollections
---

# `listCollections`

```typescript
client.vectorDb.listCollections(params?: Record<string, unknown>): Promise<VectorCollection[]>
```

Lists all vector collections.

Retrieves every collection in the vector database system. Use optional
query parameters to filter or paginate results. This is useful for
browsing available collections or displaying a collection catalog.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

## Returns

`Promise<VectorCollection[]>` — A promise that resolves to an array of VectorCollection objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.vectorDb.listCollections();
console.log(result);
```
