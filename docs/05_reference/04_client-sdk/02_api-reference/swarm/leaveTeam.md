---
title: leaveTeam
---

# `leaveTeam`

```typescript
client.swarm.leaveTeam(swarmId: string, teamId: string, data?: LeaveTeamRequest): Promise<void>
```

Leave a team within a swarm.

Removes an agent from a team, ending their membership. The agent
will no longer participate in team activities but remains in the
swarm.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `teamId` | `string` | Yes | The unique identifier of the team to leave |
| `data` | `LeaveTeamRequest` | No | Optional leave request information |

## Returns

`Promise<void>` — A promise that resolves when the agent has left the team

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.leaveTeam('swarmId', 'teamId');
console.log(result);
```
