---
title: createCollection
---

# `createCollection`

```typescript
client.vectorDb.createCollection(data: CreateVectorCollectionRequest): Promise<VectorCollection>
```

Creates a new vector collection.

Initializes a new collection with specified configuration including
dimensionality, embedding model, and metadata settings. Collections
are used to store and manage vectors for similarity search operations.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateVectorCollectionRequest` | Yes | The collection configuration data including name, dimensions, and settings |

## Returns

`Promise<VectorCollection>` — A promise that resolves to the created VectorCollection object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.vectorDb.createCollection(/* CreateVectorCollectionRequest */);
console.log(result);
```
