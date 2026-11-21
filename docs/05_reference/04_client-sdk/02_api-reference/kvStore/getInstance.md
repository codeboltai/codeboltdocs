---
title: getInstance
---

# `getInstance`

```typescript
client.kvStore.getInstance(id: string): Promise<KvStoreInstance>
```

Retrieves a specific KV store instance by its ID.

Returns the full details of the instance including its configuration
and namespace listing.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the KV store instance |

## Returns

`Promise<KvStoreInstance>` — A promise that resolves to the

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.kvStore.getInstance('id');
console.log(result);
```
