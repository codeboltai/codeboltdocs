---
title: deleteType
---

# `deleteType`

```typescript
client.persistentMemory.deleteType(id: string): Promise<unknown>
```

Permanently deletes a persistent memory type definition.

Removes the type and its pipeline configuration. Previously generated memory entries
are not affected by the deletion.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the type to delete |

## Returns

`Promise<unknown>` — A promise that resolves when the type has been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.persistentMemory.deleteType('id');
console.log(result);
```
