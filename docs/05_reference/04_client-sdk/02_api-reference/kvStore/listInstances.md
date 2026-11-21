---
title: listInstances
---

# `listInstances`

```typescript
client.kvStore.listInstances(params?: Record<string, unknown>): Promise<KvStoreInstance[]>
```

Lists all KV store instances.

Returns every instance in the system with their metadata and
namespace information.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

## Returns

`Promise<KvStoreInstance[]>` — A promise that resolves to an array of  objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.kvStore.listInstances();
console.log(result);
```
