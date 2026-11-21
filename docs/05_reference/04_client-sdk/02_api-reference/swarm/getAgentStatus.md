---
title: getAgentStatus
---

# `getAgentStatus`

```typescript
client.swarm.getAgentStatus(swarmId: string, agentId: string): Promise<SwarmAgentInfo>
```

Get the status of a specific agent in a swarm.

Retrieves current status information for an agent including its
state, last activity timestamp, and any status messages. Use this
for monitoring agent availability and health.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `agentId` | `string` | Yes | The unique identifier of the agent |

## Returns

`Promise<SwarmAgentInfo>` — A promise that resolves to the SwarmAgentInfo object with status details

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.getAgentStatus('swarmId', 'agentId');
console.log(result);
```
