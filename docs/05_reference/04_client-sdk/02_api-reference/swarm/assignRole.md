---
title: assignRole
---

# `assignRole`

```typescript
client.swarm.assignRole(swarmId: string, roleId: string, data: AssignRoleRequest): Promise<void>
```

Assign a role to an agent in a swarm.

Grants a role to an agent, giving them the associated permissions
and responsibilities. The agent can now perform actions authorized
by this role.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `roleId` | `string` | Yes | The unique identifier of the role to assign |
| `data` | `AssignRoleRequest` | Yes | The role assignment information |

## Returns

`Promise<void>` — A promise that resolves when the role is assigned

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.assignRole('swarmId', 'roleId', /* AssignRoleRequest */);
console.log(result);
```
