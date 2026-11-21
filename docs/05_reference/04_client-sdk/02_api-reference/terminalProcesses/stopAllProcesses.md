---
title: stopAllProcesses
---

# `stopAllProcesses`

```typescript
client.terminalProcesses.stopAllProcesses(): Promise<unknown>
```

Stops all running terminal processes.

Terminates every currently active terminal process in the system.
Use this for cleanup operations or when shutting down the platform
to ensure no orphaned processes remain.

## Parameters

_No parameters._

## Returns

`Promise<unknown>` — A promise that resolves when all processes have been stopped

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.terminalProcesses.stopAllProcesses();
console.log(result);
```
