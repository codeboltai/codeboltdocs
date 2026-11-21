---
title: updateCollection
---

# `updateCollection`

```typescript
client.vectorDb.updateCollection(id: string, data: UpdateVectorCollectionRequest): Promise<VectorCollection>
```

Updates a vector collection.

Modifies the configuration of an existing collection such as name,
metadata, or other configurable properties. The collection ID must
be valid and the collection must exist.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the collection to update |
| `data` | `UpdateVectorCollectionRequest` | Yes | The update data with fields to modify |

## Returns

`Promise<VectorCollection>` — A promise that resolves to the updated VectorCollection object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.vectorDb.updateCollection('id', /* UpdateVectorCollectionRequest */);
console.log(result);
```
