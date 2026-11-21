---
title: updateCollection
---

# `updateCollection`

```typescript
client.knowledge.updateCollection(id: string, data: UpdateKnowledgeCollectionRequest): Promise<KnowledgeCollection>
```

Updates a knowledge collection's properties.

Modifies collection settings such as name, description, or
chunking configuration.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the collection to update |
| `data` | `UpdateKnowledgeCollectionRequest` | Yes | The fields to update |

## Returns

`Promise<KnowledgeCollection>` — A promise that resolves to the updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledge.updateCollection('id', /* UpdateKnowledgeCollectionRequest */);
console.log(result);
```
