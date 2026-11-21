---
title: getBySwarm
---

# `getBySwarm`

```typescript
client.agentDebugApi.getBySwarm(swarmId: string): Promise<AgentDebugInstance[]>
```

Retrieves agent instances associated with a specific swarm.

Returns all debug instances that belong to the given swarm, useful for
inspecting multi-agent coordination.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm to query |

## Returns

`Promise<AgentDebugInstance[]>` — A promise that resolves to an array of AgentDebugInstance objects for that swarm

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentDebugApi.getBySwarm('swarmId');
console.log(result);
```
