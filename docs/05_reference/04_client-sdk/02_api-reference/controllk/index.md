---
title: Controllk API
---

# Controllk API

Controllk API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`send`](./send) | Sends a command to the controllk endpoint. |

## Methods

---

### `send`

```typescript
client.controllk.send(data: ControllkCommand): Promise<unknown>
```

Sends a command to the controllk endpoint.

Dispatches a structured command for the CodeBolt runtime to execute.
Commands are defined by their type and associated payload.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ControllkCommand` | Yes | The command to send, including its type and payload |

**Returns:** `Promise<unknown>` — A promise that resolves with the command execution result

[Full reference →](./send)

