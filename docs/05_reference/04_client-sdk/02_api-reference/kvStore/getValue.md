---
title: getValue
---

# `getValue`

```typescript
client.kvStore.getValue(instanceId: string, namespace: string, key: string): Promise<KvValue>
```

Retrieves a value by its key within a specific namespace.

Looks up a single key-value pair in the specified instance and
namespace. Returns the value along with its metadata.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `instanceId` | `string` | Yes | The unique identifier of the KV store instance |
| `namespace` | `string` | Yes | The namespace containing the key |
| `key` | `string` | Yes | The key to look up |

## Returns

`Promise<KvValue>` — A promise that resolves to the  including the stored data

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.kvStore.getValue('instanceId', 'namespace', 'key');
console.log(result);
```
