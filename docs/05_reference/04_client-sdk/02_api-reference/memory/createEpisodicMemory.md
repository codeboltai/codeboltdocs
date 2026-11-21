---
title: createEpisodicMemory
---

# `createEpisodicMemory`

```typescript
client.memory.createEpisodicMemory(data: CreateEpisodicMemoryRequest): Promise<MemoryThread>
```

Creates a new episodic memory for tracking temporal events and experiences.

Episodic memories store sequences of events that occurred during agent operations,
similar to how human episodic memory records experiences. They are useful for
learning from past actions and debugging agent behavior.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateEpisodicMemoryRequest` | Yes | The episodic memory creation payload |

## Returns

`Promise<MemoryThread>` — A promise that resolves to the newly created episodic memory thread

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.createEpisodicMemory(/* CreateEpisodicMemoryRequest */);
console.log(result);
```
