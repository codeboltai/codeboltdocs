---
title: listAgents
---

# `listAgents`

```typescript
client.swarm.listAgents(swarmId: string, params?: Record<string, unknown>): Promise<SwarmAgentInfo[]>
```

List agents in a swarm.

Retrieves all agents registered with a specific swarm, optionally
filtered by query parameters. Use this to view available agents
or populate agent selection interfaces.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering agents |

## Returns

`Promise<SwarmAgentInfo[]>` — A promise that resolves to an array of SwarmAgentInfo objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.listAgents('swarmId');
console.log(result);
```
