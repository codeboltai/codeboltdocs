---
title: getCollection
---

# `getCollection`

```typescript
client.vectorDb.getCollection(id: string): Promise<VectorCollection>
```

Retrieves a vector collection by its ID.

Fetches detailed information about a specific collection including
its configuration, statistics, and metadata. Use this to inspect
collection properties or verify collection existence.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the collection to retrieve |

## Returns

`Promise<VectorCollection>` — A promise that resolves to the VectorCollection object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.vectorDb.getCollection('id');
console.log(result);
```
