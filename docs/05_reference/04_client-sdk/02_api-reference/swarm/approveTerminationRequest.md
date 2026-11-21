---
title: approveTerminationRequest
---

# `approveTerminationRequest`

```typescript
client.swarm.approveTerminationRequest(swarmId: string, requestId: string, data?: TerminationRequestActionBody): Promise<void>
```

Approve a termination request.

Approves a pending termination request, authorizing the removal
of specified agent instances. The agents will be terminated
gracefully.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `requestId` | `string` | Yes | The unique identifier of the termination request |
| `data` | `TerminationRequestActionBody` | No | Optional approval information |

## Returns

`Promise<void>` — A promise that resolves when the request is approved

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.approveTerminationRequest('swarmId', 'requestId');
console.log(result);
```
