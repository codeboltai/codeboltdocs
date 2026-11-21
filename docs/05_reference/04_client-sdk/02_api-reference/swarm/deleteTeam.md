---
title: deleteTeam
---

# `deleteTeam`

```typescript
client.swarm.deleteTeam(swarmId: string, teamId: string): Promise<void>
```

Delete a team from a swarm.

Permanently removes a team and all its associated memberships.
Agents will be unassigned from the team but remain in the swarm.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `teamId` | `string` | Yes | The unique identifier of the team to delete |

## Returns

`Promise<void>` — A promise that resolves when the team is deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.deleteTeam('swarmId', 'teamId');
console.log(result);
```
