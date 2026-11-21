---
title: getRole
---

# `getRole`

```typescript
client.swarm.getRole(swarmId: string, roleId: string): Promise<SwarmRole>
```

Get a role by ID within a swarm.

Retrieves detailed information about a specific role including its
permissions and assigned agents. Use this for displaying role details
or managing role assignments.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `roleId` | `string` | Yes | The unique identifier of the role |

## Returns

`Promise<SwarmRole>` — A promise that resolves to the SwarmRole object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.getRole('swarmId', 'roleId');
console.log(result);
```
