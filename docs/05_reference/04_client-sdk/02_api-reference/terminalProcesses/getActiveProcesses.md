---
title: getActiveProcesses
---

# `getActiveProcesses`

```typescript
client.terminalProcesses.getActiveProcesses(): Promise<TerminalProcess[]>
```

Retrieves all currently active terminal processes.

Returns terminal processes that are currently running, including
their process IDs, commands, and status information. Use this to
monitor what shell operations are in progress.

## Parameters

_No parameters._

## Returns

`Promise<TerminalProcess[]>` — A promise that resolves to an array of active TerminalProcess objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.terminalProcesses.getActiveProcesses();
console.log(result);
```
