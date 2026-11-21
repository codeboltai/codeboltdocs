---
title: deleteSwarm
---

# `deleteSwarm`

```typescript
client.swarm.deleteSwarm(swarmId: string): Promise<void>
```

Delete a swarm by ID.

Permanently removes a swarm and all its associated resources including
teams, roles, agents, and configurations. This action cannot be undone.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm to delete |

## Returns

`Promise<void>` — A promise that resolves when the swarm is deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.deleteSwarm('swarmId');
console.log(result);
```
