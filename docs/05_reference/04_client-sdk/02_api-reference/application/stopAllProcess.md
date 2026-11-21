---
title: stopAllProcess
---

# `stopAllProcess`

```typescript
client.application.stopAllProcess(data?: StopAllProcessRequest): Promise<void>
```

Stops all running processes.

Terminates every active process in the CodeBolt runtime, including
agents, terminals, and background tasks. Use with caution.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `StopAllProcessRequest` | No | Optional configuration for the stop operation |

## Returns

`Promise<void>` — A promise that resolves when all processes have been stopped

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.application.stopAllProcess();
console.log(result);
```
