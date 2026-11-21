---
title: deleteRole
---

# `deleteRole`

```typescript
client.swarm.deleteRole(swarmId: string, roleId: string): Promise<void>
```

Delete a role from a swarm.

Permanently removes a role and unassigns all agents from it.
Agents will lose the permissions and responsibilities associated
with the role.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `roleId` | `string` | Yes | The unique identifier of the role to delete |

## Returns

`Promise<void>` — A promise that resolves when the role is deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.deleteRole('swarmId', 'roleId');
console.log(result);
```
