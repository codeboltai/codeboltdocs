---
title: updateType
---

# `updateType`

```typescript
client.persistentMemory.updateType(id: string, data: UpdatePersistentMemoryTypeRequest): Promise<PersistentMemoryType>
```

Updates an existing persistent memory type's configuration.

Modifies the type's processing steps, name, or other settings. Changes affect
subsequent executions but do not alter previously generated memories.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the type to update |
| `data` | `UpdatePersistentMemoryTypeRequest` | Yes | The fields to update |

## Returns

`Promise<PersistentMemoryType>` — A promise that resolves to the updated persistent memory type

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.persistentMemory.updateType('id', /* UpdatePersistentMemoryTypeRequest */);
console.log(result);
```
