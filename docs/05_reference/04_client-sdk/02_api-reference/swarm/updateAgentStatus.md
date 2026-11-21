---
title: updateAgentStatus
---

# `updateAgentStatus`

```typescript
client.swarm.updateAgentStatus(swarmId: string, agentId: string, data: AgentStatusUpdateRequest): Promise<void>
```

Update the status of an agent in a swarm.

Changes the operational status of an agent, such as marking it as
available, busy, offline, or in error. Status updates affect agent
assignment and task distribution.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `agentId` | `string` | Yes | The unique identifier of the agent |
| `data` | `AgentStatusUpdateRequest` | Yes | The status update information |

## Returns

`Promise<void>` — A promise that resolves when the status is updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.updateAgentStatus('swarmId', 'agentId', /* AgentStatusUpdateRequest */);
console.log(result);
```
