---
title: deleteInstance
---

# `deleteInstance`

```typescript
client.kvStore.deleteInstance(id: string): Promise<unknown>
```

Deletes a KV store instance and all its data.

Permanently removes the instance, all its namespaces, and all
stored key-value pairs. This action cannot be undone.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the instance to delete |

## Returns

`Promise<unknown>` — A promise that resolves when deletion is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.kvStore.deleteInstance('id');
console.log(result);
```
