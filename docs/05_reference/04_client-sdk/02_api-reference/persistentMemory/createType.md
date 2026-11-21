---
title: createType
---

# `createType`

```typescript
client.persistentMemory.createType(data: CreatePersistentMemoryTypeRequest): Promise<PersistentMemoryType>
```

Creates a new persistent memory type with a defined processing pipeline.

Registers a new memory type that describes how input data should be processed and
stored. The type definition includes a sequence of steps that will be executed
when the pipeline runs.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreatePersistentMemoryTypeRequest` | Yes | The type creation payload |

## Returns

`Promise<PersistentMemoryType>` — A promise that resolves to the newly created persistent memory type

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.persistentMemory.createType(/* CreatePersistentMemoryTypeRequest */);
console.log(result);
```
