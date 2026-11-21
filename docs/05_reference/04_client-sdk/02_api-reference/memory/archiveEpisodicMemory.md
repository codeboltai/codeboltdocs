---
title: archiveEpisodicMemory
---

# `archiveEpisodicMemory`

```typescript
client.memory.archiveEpisodicMemory(id: string): Promise<unknown>
```

Archives an episodic memory to remove it from active listings.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the episodic memory to archive |

## Returns

`Promise<unknown>` — A promise that resolves when the memory has been archived

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.archiveEpisodicMemory('id');
console.log(result);
```
