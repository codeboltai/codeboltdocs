---
title: deleteNamespace
---

# `deleteNamespace`

```typescript
client.kvStore.deleteNamespace(instanceId: string, namespace: string): Promise<unknown>
```

Deletes all key-value pairs within a namespace.

Clears the entire namespace, removing every key and its associated
value. Other namespaces in the instance are not affected.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `instanceId` | `string` | Yes | The unique identifier of the KV store instance |
| `namespace` | `string` | Yes | The namespace to delete |

## Returns

`Promise<unknown>` — A promise that resolves when the namespace has been cleared

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.kvStore.deleteNamespace('instanceId', 'namespace');
console.log(result);
```
