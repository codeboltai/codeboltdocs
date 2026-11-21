---
title: listTerminationRequests
---

# `listTerminationRequests`

```typescript
client.swarm.listTerminationRequests(swarmId: string, params?: Record<string, unknown>): Promise<unknown[]>
```

List termination requests for a swarm.

Retrieves all termination requests associated with a swarm, including
pending, approved, and completed requests. Use this to track
termination request status and history.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm |
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering requests |

## Returns

`Promise<unknown[]>` — A promise that resolves to an array of termination requests

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.listTerminationRequests('swarmId');
console.log(result);
```
