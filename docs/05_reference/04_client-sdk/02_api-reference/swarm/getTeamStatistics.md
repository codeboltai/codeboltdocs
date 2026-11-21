---
title: getTeamStatistics
---

# `getTeamStatistics`

```typescript
client.swarm.getTeamStatistics(swarmId: string): Promise<SwarmTeamStatistics[]>
```

Get team statistics for a swarm.

Retrieves statistical information about all teams in a swarm,
including member counts, activity levels, and performance metrics.
Use this for monitoring team health and utilization.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |

## Returns

`Promise<SwarmTeamStatistics[]>` — A promise that resolves to an array of SwarmTeamStatistics objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.getTeamStatistics('swarmId');
console.log(result);
```
