---
title: shell
---

# shell

PTY terminal — send commands, resize, receive output. Access via `client.sockets.shell`.

All socket modules extend `TypedEventEmitter` and provide `.on()`, `.off()`, `.once()` for event listening.

## Events

Listen for events using `client.sockets.shell.on(event, handler)`:

| Event |
|---|
| `output` |
| `connected` |

```typescript
client.sockets.shell.on('output', (data) => {
  console.log(data);
});
```

## Send Methods

| Method |
|---|
| `send()` |
| `resize()` |
| `ping()` |

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

// Listen for events
client.sockets.shell.on('output', (data) => {
  console.log('output:', data);
});

// Send
client.sockets.shell.send();
```
