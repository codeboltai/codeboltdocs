---
title: getCollection
---

# `getCollection`

```typescript
client.knowledge.getCollection(id: string): Promise<KnowledgeCollection>
```

Retrieves a specific knowledge collection by its ID.

Returns the full details of a collection including its metadata,
document count, and configuration.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the knowledge collection |

## Returns

`Promise<KnowledgeCollection>` — A promise that resolves to the

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledge.getCollection('id');
console.log(result);
```
