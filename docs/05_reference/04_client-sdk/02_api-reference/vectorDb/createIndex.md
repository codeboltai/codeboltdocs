---
title: createIndex
---

# `createIndex`

```typescript
client.vectorDb.createIndex(data: CreateVectorIndexRequest): Promise<unknown>
```

Creates a vector index for a collection.

Initializes an index structure to optimize similarity search
performance. Indexes enable fast nearest neighbor queries on
high-dimensional vectors and are essential for efficient retrieval.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateVectorIndexRequest` | Yes | The index creation configuration |

## Returns

`Promise<unknown>` — A promise that resolves when the index has been created

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.vectorDb.createIndex(/* CreateVectorIndexRequest */);
console.log(result);
```
