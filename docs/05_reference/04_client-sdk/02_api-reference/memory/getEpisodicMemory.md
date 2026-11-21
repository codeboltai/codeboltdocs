---
title: getEpisodicMemory
---

# `getEpisodicMemory`

```typescript
client.memory.getEpisodicMemory(id: string): Promise<MemoryThread>
```

Retrieves a specific episodic memory by its unique identifier.

Returns the episodic memory metadata. Use  to access
the individual events stored within the memory.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the episodic memory to retrieve |

## Returns

`Promise<MemoryThread>` — A promise that resolves to the episodic memory thread

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.getEpisodicMemory('id');
console.log(result);
```
