---
title: listTeams
---

# `listTeams`

```typescript
client.swarm.listTeams(swarmId: string, params?: Record<string, unknown>): Promise<SwarmTeam[]>
```

List teams in a swarm.

Retrieves all teams within a swarm, optionally filtered by query
parameters. Use this to view team structure or populate team
selection interfaces.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering teams |

## Returns

`Promise<SwarmTeam[]>` — A promise that resolves to an array of SwarmTeam objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.listTeams('swarmId');
console.log(result);
```
