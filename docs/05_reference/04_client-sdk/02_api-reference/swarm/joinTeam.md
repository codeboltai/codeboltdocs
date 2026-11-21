---
title: joinTeam
---

# `joinTeam`

```typescript
client.swarm.joinTeam(swarmId: string, teamId: string, data?: JoinTeamRequest): Promise<void>
```

Join a team within a swarm.

Adds an agent to a team as a member. The agent will be associated
with the team and can participate in team-specific tasks and
activities.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `teamId` | `string` | Yes | The unique identifier of the team to join |
| `data` | `JoinTeamRequest` | No | Optional join request information |

## Returns

`Promise<void>` — A promise that resolves when the agent has joined the team

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.joinTeam('swarmId', 'teamId');
console.log(result);
```
