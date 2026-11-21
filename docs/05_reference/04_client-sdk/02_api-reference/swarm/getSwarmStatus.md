---
title: getSwarmStatus
---

# `getSwarmStatus`

```typescript
client.swarm.getSwarmStatus(swarmId: string): Promise<SwarmStatusUpdate>
```

Get the overall status of a swarm.

Retrieves comprehensive status information about a swarm including
its operational state, agent availability, team health, and overall
readiness to execute tasks.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |

## Returns

`Promise<SwarmStatusUpdate>` — A promise that resolves to the SwarmStatusUpdate object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.getSwarmStatus('swarmId');
console.log(result);
```
