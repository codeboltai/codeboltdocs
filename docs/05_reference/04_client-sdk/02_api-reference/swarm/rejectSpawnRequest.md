---
title: rejectSpawnRequest
---

# `rejectSpawnRequest`

```typescript
client.swarm.rejectSpawnRequest(swarmId: string, requestId: string, data?: SpawnRequestActionBody): Promise<void>
```

Reject a spawn request.

Rejects a pending spawn request, preventing the creation of new
agent instances. The request will be marked as rejected and
no agents will be spawned.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `requestId` | `string` | Yes | The unique identifier of the spawn request |
| `data` | `SpawnRequestActionBody` | No | Optional rejection information |

## Returns

`Promise<void>` — A promise that resolves when the request is rejected

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.rejectSpawnRequest('swarmId', 'requestId');
console.log(result);
```
