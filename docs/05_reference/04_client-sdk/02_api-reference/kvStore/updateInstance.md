---
title: updateInstance
---

# `updateInstance`

```typescript
client.kvStore.updateInstance(id: string, data: UpdateKvStoreInstanceRequest): Promise<KvStoreInstance>
```

Updates a KV store instance's configuration.

Modifies instance properties such as name or settings. The stored
data is not affected by instance updates.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the instance to update |
| `data` | `UpdateKvStoreInstanceRequest` | Yes | The fields to update |

## Returns

`Promise<KvStoreInstance>` — A promise that resolves to the updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.kvStore.updateInstance('id', /* UpdateKvStoreInstanceRequest */);
console.log(result);
```
