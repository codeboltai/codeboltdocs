---
title: TerminalProcesses API
---

# TerminalProcesses API

Terminal Processes API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`getActiveProcesses`](./getActiveProcesses) | Retrieves all currently active terminal processes. |
| [`stopAllProcesses`](./stopAllProcesses) | Stops all running terminal processes. |
| [`stopProcess`](./stopProcess) | Stops a specific terminal process by its ID. |

## Methods

---

### `getActiveProcesses`

```typescript
client.terminalProcesses.getActiveProcesses(): Promise<TerminalProcess[]>
```

Retrieves all currently active terminal processes.

Returns terminal processes that are currently running, including
their process IDs, commands, and status information. Use this to
monitor what shell operations are in progress.

_No parameters._

**Returns:** `Promise<TerminalProcess[]>` — A promise that resolves to an array of active TerminalProcess objects

[Full reference →](./getActiveProcesses)

---

### `stopAllProcesses`

```typescript
client.terminalProcesses.stopAllProcesses(): Promise<unknown>
```

Stops all running terminal processes.

Terminates every currently active terminal process in the system.
Use this for cleanup operations or when shutting down the platform
to ensure no orphaned processes remain.

_No parameters._

**Returns:** `Promise<unknown>` — A promise that resolves when all processes have been stopped

[Full reference →](./stopAllProcesses)

---

### `stopProcess`

```typescript
client.terminalProcesses.stopProcess(processId: string): Promise<unknown>
```

Stops a specific terminal process by its ID.

Sends a termination signal to the specified terminal process,
ending its execution gracefully if possible. The process will be
removed from the active process list.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `processId` | `string` | Yes | The unique identifier of the terminal process to stop |

**Returns:** `Promise<unknown>` — A promise that resolves when the process has been stopped

[Full reference →](./stopProcess)

