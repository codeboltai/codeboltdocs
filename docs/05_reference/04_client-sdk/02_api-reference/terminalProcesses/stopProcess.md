---
title: stopProcess
---

# `stopProcess`

```typescript
client.terminalProcesses.stopProcess(processId: string): Promise<unknown>
```

Stops a specific terminal process by its ID.

Sends a termination signal to the specified terminal process,
ending its execution gracefully if possible. The process will be
removed from the active process list.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `processId` | `string` | Yes | The unique identifier of the terminal process to stop |

## Returns

`Promise<unknown>` — A promise that resolves when the process has been stopped

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.terminalProcesses.stopProcess('processId');
console.log(result);
```
