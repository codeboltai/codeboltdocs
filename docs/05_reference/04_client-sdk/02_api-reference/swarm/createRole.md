---
title: createRole
---

# `createRole`

```typescript
client.swarm.createRole(swarmId: string, data: CreateRoleRequest): Promise<SwarmRole>
```

Create a role in a swarm.

Creates a new role that agents can be assigned to. Roles define
agent responsibilities, permissions, and capabilities within the
swarm context.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `data` | `CreateRoleRequest` | Yes | The role creation information |

## Returns

`Promise<SwarmRole>` — A promise that resolves to the created SwarmRole object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.createRole('swarmId', /* CreateRoleRequest */);
console.log(result);
```
