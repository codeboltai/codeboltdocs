---
title: setValue
---

# `setValue`

```typescript
client.kvStore.setValue(data: SetKvValueRequest): Promise<KvValue>
```

Sets a key-value pair in the store.

Creates or overwrites a value at the specified key within a namespace
and instance. The value can be any JSON-serializable data.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `SetKvValueRequest` | Yes | The set request including instance ID, namespace, key, and value |

## Returns

`Promise<KvValue>` — A promise that resolves to the stored

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.kvStore.setValue(/* SetKvValueRequest */);
console.log(result);
```
