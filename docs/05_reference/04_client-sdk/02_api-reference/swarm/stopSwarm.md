---
title: stopSwarm
---

# `stopSwarm`

```typescript
client.swarm.stopSwarm(swarmId: string, data?: Record<string, unknown>): Promise<void>
```

Stop a swarm.

Deactivates a swarm, halting all in-progress tasks and agent
activities. The swarm will gracefully shut down and return to
an idle state.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `data` | `Record<string, unknown>` | No | Optional stop parameters |

## Returns

`Promise<void>` — A promise that resolves when the swarm has stopped

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.stopSwarm('swarmId');
console.log(result);
```
