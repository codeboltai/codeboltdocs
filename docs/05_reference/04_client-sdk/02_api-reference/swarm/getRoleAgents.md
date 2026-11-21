---
title: getRoleAgents
---

# `getRoleAgents`

```typescript
client.swarm.getRoleAgents(swarmId: string, roleId: string): Promise<SwarmAgentInfo[]>
```

Get agents assigned to a specific role.

Retrieves all agents that currently have the specified role assigned
to them. Use this to view role membership or manage role assignments.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `roleId` | `string` | Yes | The unique identifier of the role |

## Returns

`Promise<SwarmAgentInfo[]>` — A promise that resolves to an array of SwarmAgentInfo objects with the role

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.getRoleAgents('swarmId', 'roleId');
console.log(result);
```
