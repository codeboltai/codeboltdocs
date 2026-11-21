---
title: rejectTerminationRequest
---

# `rejectTerminationRequest`

```typescript
client.swarm.rejectTerminationRequest(swarmId: string, requestId: string, data?: TerminationRequestActionBody): Promise<void>
```

Reject a termination request.

Rejects a pending termination request, preventing the removal of
agent instances. The agents will continue operating in the swarm.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `requestId` | `string` | Yes | The unique identifier of the termination request |
| `data` | `TerminationRequestActionBody` | No | Optional rejection information |

## Returns

`Promise<void>` — A promise that resolves when the request is rejected

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.rejectTerminationRequest('swarmId', 'requestId');
console.log(result);
```
