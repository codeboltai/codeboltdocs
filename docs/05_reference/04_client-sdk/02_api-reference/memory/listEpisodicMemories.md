---
title: listEpisodicMemories
---

# `listEpisodicMemories`

```typescript
client.memory.listEpisodicMemories(params?: ListMemoryThreadsParams): Promise<MemoryThread[]>
```

Lists all episodic memories with optional filtering.

Returns episodic memory records that match the provided criteria.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `ListMemoryThreadsParams` | No | Optional filtering and pagination parameters |

## Returns

`Promise<MemoryThread[]>` — A promise that resolves to an array of episodic memory threads

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.listEpisodicMemories();
console.log(result);
```
