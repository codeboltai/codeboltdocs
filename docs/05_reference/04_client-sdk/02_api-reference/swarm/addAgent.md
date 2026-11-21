---
title: addAgent
---

# `addAgent`

```typescript
client.swarm.addAgent(swarmId: string, data: AgentRegistration): Promise<SwarmAgentInfo>
```

Add an agent to a swarm.

Registers a new agent with the swarm, making it available for assignment
to teams and roles. Agents are the worker entities that perform tasks
within the swarm context.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `data` | `AgentRegistration` | Yes | The agent registration information |

## Returns

`Promise<SwarmAgentInfo>` — A promise that resolves to the registered SwarmAgentInfo object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.addAgent('swarmId', /* AgentRegistration */);
console.log(result);
```
