---
title: listCollections
---

# `listCollections`

```typescript
client.knowledge.listCollections(params?: Record<string, unknown>): Promise<KnowledgeCollection[]>
```

Lists all knowledge collections.

Returns every collection in the system. Use optional parameters
to filter or paginate the results.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

## Returns

`Promise<KnowledgeCollection[]>` — A promise that resolves to an array of  objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledge.listCollections();
console.log(result);
```
