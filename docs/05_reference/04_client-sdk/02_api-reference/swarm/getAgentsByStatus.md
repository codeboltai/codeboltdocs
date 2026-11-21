---
title: getAgentsByStatus
---

# `getAgentsByStatus`

```typescript
client.swarm.getAgentsByStatus(swarmId: string, status: string): Promise<SwarmAgentInfo[]>
```

Get agents filtered by status in a swarm.

Retrieves all agents in a swarm that match a specific status, such as
all available agents or all agents in error state. This is useful for
finding agents ready for task assignment.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `status` | `string` | Yes | The status to filter by (available, busy, offline, etc.) |

## Returns

`Promise<SwarmAgentInfo[]>` — A promise that resolves to an array of matching SwarmAgentInfo objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.getAgentsByStatus('swarmId', 'status');
console.log(result);
```
