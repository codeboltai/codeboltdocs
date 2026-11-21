---
title: executeType
---

# `executeType`

```typescript
client.persistentMemory.executeType(id: string, data?: ExecutePersistentMemoryRequest): Promise<unknown>
```

Executes a persistent memory type's processing pipeline.

Runs the defined processing steps against the provided input data or configured
data source, generating new memory entries as output.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the type to execute |
| `data` | `ExecutePersistentMemoryRequest` | No | Optional execution parameters and input data |

## Returns

`Promise<unknown>` — A promise that resolves when the execution has been initiated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.persistentMemory.executeType('id');
console.log(result);
```
