---
title: send
---

# `send`

```typescript
client.controllk.send(data: ControllkCommand): Promise<unknown>
```

Sends a command to the controllk endpoint.

Dispatches a structured command for the CodeBolt runtime to execute.
Commands are defined by their type and associated payload.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ControllkCommand` | Yes | The command to send, including its type and payload |

## Returns

`Promise<unknown>` — A promise that resolves with the command execution result

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.controllk.send(/* ControllkCommand */);
console.log(result);
```
