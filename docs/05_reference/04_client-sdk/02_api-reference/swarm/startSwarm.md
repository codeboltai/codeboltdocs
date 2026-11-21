---
title: startSwarm
---

# `startSwarm`

```typescript
client.swarm.startSwarm(swarmId: string, data?: StartSwarmRequest): Promise<void>
```

Start a swarm.

Activates a swarm, enabling it to begin processing tasks and
coordinating agent activities. The swarm will start executing
its assigned workflow according to its configuration.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `data` | `StartSwarmRequest` | No | Optional start parameters |

## Returns

`Promise<void>` — A promise that resolves when the swarm has started

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.startSwarm('swarmId');
console.log(result);
```
