---
title: approveSpawnRequest
---

# `approveSpawnRequest`

```typescript
client.swarm.approveSpawnRequest(swarmId: string, requestId: string, data?: SpawnRequestActionBody): Promise<void>
```

Approve a spawn request.

Approves a pending spawn request, authorizing the creation of new
agent instances. The agents will be spawned according to the
request specifications.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `requestId` | `string` | Yes | The unique identifier of the spawn request |
| `data` | `SpawnRequestActionBody` | No | Optional approval information |

## Returns

`Promise<void>` — A promise that resolves when the request is approved

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.approveSpawnRequest('swarmId', 'requestId');
console.log(result);
```
