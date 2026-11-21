---
title: listSpawnRequests
---

# `listSpawnRequests`

```typescript
client.swarm.listSpawnRequests(swarmId: string, params?: Record<string, unknown>): Promise<SpawnRequest[]>
```

List spawn requests for a swarm.

Retrieves all spawn requests associated with a swarm, including
pending, approved, and completed requests. Use this to track
spawn request status and history.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering requests |

## Returns

`Promise<SpawnRequest[]>` — A promise that resolves to an array of SpawnRequest objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.listSpawnRequests('swarmId');
console.log(result);
```
