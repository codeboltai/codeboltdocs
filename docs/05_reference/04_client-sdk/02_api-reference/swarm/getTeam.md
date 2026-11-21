---
title: getTeam
---

# `getTeam`

```typescript
client.swarm.getTeam(swarmId: string, teamId: string): Promise<SwarmTeam>
```

Get a team by ID within a swarm.

Retrieves detailed information about a specific team including its
members, roles, and configuration. Use this for displaying team
details or managing team state.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `teamId` | `string` | Yes | The unique identifier of the team |

## Returns

`Promise<SwarmTeam>` — A promise that resolves to the SwarmTeam object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.getTeam('swarmId', 'teamId');
console.log(result);
```
