---
title: getEpisodicAgents
---

# `getEpisodicAgents`

```typescript
client.memory.getEpisodicAgents(id: string): Promise<string[]>
```

Retrieves the distinct agents that have contributed events to an episodic memory.

Returns the unique set of agent identifiers that recorded events in this memory.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the episodic memory |

## Returns

`Promise<string[]>` — A promise that resolves to an array of agent identifier strings

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.getEpisodicAgents('id');
console.log(result);
```
