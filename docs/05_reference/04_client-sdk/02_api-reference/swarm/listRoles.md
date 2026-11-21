---
title: listRoles
---

# `listRoles`

```typescript
client.swarm.listRoles(swarmId: string, params?: Record<string, unknown>): Promise<SwarmRole[]>
```

List roles in a swarm.

Retrieves all roles defined in a swarm, optionally filtered by query
parameters. Use this to view available roles or populate role
selection interfaces.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering roles |

## Returns

`Promise<SwarmRole[]>` — A promise that resolves to an array of SwarmRole objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.listRoles('swarmId');
console.log(result);
```
