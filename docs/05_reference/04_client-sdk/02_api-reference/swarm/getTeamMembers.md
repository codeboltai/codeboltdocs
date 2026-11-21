---
title: getTeamMembers
---

# `getTeamMembers`

```typescript
client.swarm.getTeamMembers(swarmId: string, teamId: string): Promise<SwarmAgentInfo[]>
```

Get the members of a team within a swarm.

Retrieves all agents that are currently members of the specified team.
Use this to view team composition or manage team membership.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `teamId` | `string` | Yes | The unique identifier of the team |

## Returns

`Promise<SwarmAgentInfo[]>` — A promise that resolves to an array of SwarmAgentInfo objects representing team members

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.getTeamMembers('swarmId', 'teamId');
console.log(result);
```
