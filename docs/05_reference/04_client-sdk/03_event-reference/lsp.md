---
title: lsp
---

# lsp

Language Server Protocol. Access via `client.sockets.lsp`.

All socket modules extend `TypedEventEmitter` and provide `.on()`, `.off()`, `.once()` for event listening.

## Events

Listen for events using `client.sockets.lsp.on(event, handler)`:

| Event |
|---|
| `message` |
| `error` |
| `connected` |
| `disconnected` |

```typescript
client.sockets.lsp.on('message', (data) => {
  console.log(data);
});
```

## Send Methods

| Method |
|---|
| `send()` |
| `sendRequest()` |
| `sendNotification()` |

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

// Listen for events
client.sockets.lsp.on('message', (data) => {
  console.log('message:', data);
});

// Send
client.sockets.lsp.send();
```
