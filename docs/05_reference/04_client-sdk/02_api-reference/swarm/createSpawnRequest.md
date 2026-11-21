---
title: createSpawnRequest
---

# `createSpawnRequest`

```typescript
client.swarm.createSpawnRequest(swarmId: string, data: CreateSpawnRequestBody): Promise<SpawnRequest>
```

Create a spawn request for a swarm.

Submits a request to spawn new agent instances within the swarm.
This is used to dynamically scale the swarm by adding more agents
to handle increased workload.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `data` | `CreateSpawnRequestBody` | Yes | The spawn request details |

## Returns

`Promise<SpawnRequest>` — A promise that resolves to the created SpawnRequest object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.createSpawnRequest('swarmId', /* CreateSpawnRequestBody */);
console.log(result);
```
