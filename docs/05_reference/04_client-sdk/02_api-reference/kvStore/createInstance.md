---
title: createInstance
---

# `createInstance`

```typescript
client.kvStore.createInstance(data: CreateKvStoreInstanceRequest): Promise<KvStoreInstance>
```

Creates a new KV store instance.

An instance is an isolated key-value store that can contain multiple
namespaces. Use separate instances to isolate data between different
agents or workflows.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateKvStoreInstanceRequest` | Yes | Instance creation payload including name and configuration |

## Returns

`Promise<KvStoreInstance>` — A promise that resolves to the newly created

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.kvStore.createInstance(/* CreateKvStoreInstanceRequest */);
console.log(result);
```
