---
title: unarchiveEpisodicMemory
---

# `unarchiveEpisodicMemory`

```typescript
client.memory.unarchiveEpisodicMemory(id: string): Promise<unknown>
```

Restores an archived episodic memory back to active status.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the episodic memory to unarchive |

## Returns

`Promise<unknown>` — A promise that resolves when the memory has been unarchived

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.unarchiveEpisodicMemory('id');
console.log(result);
```
