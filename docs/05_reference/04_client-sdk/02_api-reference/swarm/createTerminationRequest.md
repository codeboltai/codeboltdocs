---
title: createTerminationRequest
---

# `createTerminationRequest`

```typescript
client.swarm.createTerminationRequest(swarmId: string, data: CreateTerminationRequestBody): Promise<unknown>
```

Create a termination request for a swarm.

Submits a request to terminate specific agent instances within
the swarm. This is used to reduce swarm size or remove specific
agents.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `data` | `CreateTerminationRequestBody` | Yes | The termination request details |

## Returns

`Promise<unknown>` — A promise that resolves to the created termination request

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.createTerminationRequest('swarmId', /* CreateTerminationRequestBody */);
console.log(result);
```
