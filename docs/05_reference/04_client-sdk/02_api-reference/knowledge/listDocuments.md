---
title: listDocuments
---

# `listDocuments`

```typescript
client.knowledge.listDocuments(id: string, params?: Record<string, unknown>): Promise<KnowledgeDocument[]>
```

Lists all documents in a knowledge collection.

Returns the documents belonging to the specified collection with
their metadata. Does not include chunk-level content.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the collection |
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

## Returns

`Promise<KnowledgeDocument[]>` — A promise that resolves to an array of  objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledge.listDocuments('id');
console.log(result);
```
