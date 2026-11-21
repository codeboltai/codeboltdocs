---
title: removeAgent
---

# `removeAgent`

```typescript
client.swarm.removeAgent(swarmId: string, agentId: string): Promise<void>
```

Remove an agent from a swarm.

Unregisters an agent from the swarm, removing it from all teams
and roles. The agent will no longer participate in swarm activities.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `agentId` | `string` | Yes | The unique identifier of the agent to remove |

## Returns

`Promise<void>` — A promise that resolves when the agent is removed

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.removeAgent('swarmId', 'agentId');
console.log(result);
```
