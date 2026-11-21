---
title: unassignRole
---

# `unassignRole`

```typescript
client.swarm.unassignRole(swarmId: string, roleId: string, data: UnassignRoleRequest): Promise<void>
```

Unassign a role from an agent in a swarm.

Removes a role from an agent, revoking the associated permissions
and responsibilities. The agent will no longer be able to perform
actions authorized by this role.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `roleId` | `string` | Yes | The unique identifier of the role to unassign |
| `data` | `UnassignRoleRequest` | Yes | The role unassignment information |

## Returns

`Promise<void>` — A promise that resolves when the role is unassigned

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.unassignRole('swarmId', 'roleId', /* UnassignRoleRequest */);
console.log(result);
```
