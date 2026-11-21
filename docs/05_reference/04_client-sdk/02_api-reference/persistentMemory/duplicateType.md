---
title: duplicateType
---

# `duplicateType`

```typescript
client.persistentMemory.duplicateType(id: string, data?: DuplicatePersistentMemoryRequest): Promise<PersistentMemoryType>
```

Creates a copy of an existing persistent memory type.

Duplicates the type definition, optionally with modifications such as a new name.
Useful for creating variations of working pipelines.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the type to duplicate |
| `data` | `DuplicatePersistentMemoryRequest` | No | Optional modifications to apply to the duplicated type |

## Returns

`Promise<PersistentMemoryType>` — A promise that resolves to the newly created duplicate type

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.persistentMemory.duplicateType('id');
console.log(result);
```
