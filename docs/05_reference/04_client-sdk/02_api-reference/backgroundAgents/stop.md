---
title: stop
---

# `stop`

```typescript
client.backgroundAgents.stop(instanceId: string, data?: StopBackgroundAgentRequest): Promise<unknown>
```

Stops a running background agent instance.

Sends a stop signal to the specified background agent, causing it
to terminate gracefully.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `instanceId` | `string` | Yes | The unique identifier of the background agent instance to stop |
| `data` | `StopBackgroundAgentRequest` | No | Optional stop configuration |

## Returns

`Promise<unknown>` — A promise that resolves when the stop signal has been sent

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.backgroundAgents.stop('instanceId');
console.log(result);
```
