---
title: deleteValue
---

# `deleteValue`

```typescript
client.kvStore.deleteValue(instanceId: string, namespace: string, key: string): Promise<unknown>
```

Deletes a single key-value pair from the store.

Removes the specified key and its value from the namespace. Other
keys in the same namespace are not affected.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `instanceId` | `string` | Yes | The unique identifier of the KV store instance |
| `namespace` | `string` | Yes | The namespace containing the key |
| `key` | `string` | Yes | The key to delete |

## Returns

`Promise<unknown>` — A promise that resolves when the key-value pair has been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.kvStore.deleteValue('instanceId', 'namespace', 'key');
console.log(result);
```
