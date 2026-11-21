---
title: updateEpisodicMemory
---

# `updateEpisodicMemory`

```typescript
client.memory.updateEpisodicMemory(id: string, data: UpdateEpisodicMemoryRequest): Promise<MemoryThread>
```

Updates the metadata of an episodic memory.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the episodic memory to update |
| `data` | `UpdateEpisodicMemoryRequest` | Yes | The fields to update |

## Returns

`Promise<MemoryThread>` — A promise that resolves to the updated episodic memory thread

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.updateEpisodicMemory('id', /* UpdateEpisodicMemoryRequest */);
console.log(result);
```
