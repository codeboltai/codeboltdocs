---
title: getRoleStatistics
---

# `getRoleStatistics`

```typescript
client.swarm.getRoleStatistics(swarmId: string): Promise<SwarmRoleStatistics[]>
```

Get role statistics for a swarm.

Retrieves statistical information about all roles in a swarm,
including assignment counts, utilization rates, and activity metrics.
Use this for monitoring role distribution and workload balance.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |

## Returns

`Promise<SwarmRoleStatistics[]>` — A promise that resolves to an array of SwarmRoleStatistics objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.getRoleStatistics('swarmId');
console.log(result);
```
