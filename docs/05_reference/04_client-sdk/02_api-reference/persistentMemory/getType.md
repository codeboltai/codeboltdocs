---
title: getType
---

# `getType`

```typescript
client.persistentMemory.getType(id: string): Promise<PersistentMemoryType>
```

Retrieves a specific persistent memory type by its unique identifier.

Returns the full type definition including its processing steps, configuration,
and metadata.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the persistent memory type |

## Returns

`Promise<PersistentMemoryType>` — A promise that resolves to the persistent memory type definition

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.persistentMemory.getType('id');
console.log(result);
```
