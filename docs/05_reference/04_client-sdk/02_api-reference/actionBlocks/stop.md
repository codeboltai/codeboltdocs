---
title: stop
---

# `stop`

```typescript
client.actionBlocks.stop(data: StopActionBlockRequest): Promise<unknown>
```

Stops a currently running action block execution.

Sends a stop signal to the specified action block execution, causing it
to terminate gracefully. Use this to cancel long-running or stuck executions.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `StopActionBlockRequest` | Yes | The stop request containing the execution identifier to halt |

## Returns

`Promise<unknown>` — A promise that resolves when the stop signal has been sent

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.actionBlocks.stop(/* StopActionBlockRequest */);
console.log(result);
```
