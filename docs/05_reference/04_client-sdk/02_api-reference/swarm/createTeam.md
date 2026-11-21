---
title: createTeam
---

# `createTeam`

```typescript
client.swarm.createTeam(swarmId: string, data: CreateTeamRequest): Promise<SwarmTeam>
```

Create a team in a swarm.

Creates a new team within the swarm, providing organizational structure
for grouping agents. Teams can be assigned specific goals and tasks,
with agents collaborating within the team context.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `data` | `CreateTeamRequest` | Yes | The team creation information |

## Returns

`Promise<SwarmTeam>` — A promise that resolves to the created SwarmTeam object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.createTeam('swarmId', /* CreateTeamRequest */);
console.log(result);
```
