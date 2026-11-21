---
title: chat
---

# chat

Chat message streaming. Access via `client.sockets.chat`.

All socket modules extend `TypedEventEmitter` and provide `.on()`, `.off()`, `.once()` for event listening.

## Events

Listen for events using `client.sockets.chat.on(event, handler)`:

| Event |
|---|
| `message` |
| `error` |
| `connected` |
| `disconnected` |

```typescript
client.sockets.chat.on('message', (data) => {
  console.log(data);
});
```

## Send Methods

| Method |
|---|
| `sendMessage()` |

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

// Listen for events
client.sockets.chat.on('message', (data) => {
  console.log('message:', data);
});

// Send
client.sockets.chat.sendMessage();
```
