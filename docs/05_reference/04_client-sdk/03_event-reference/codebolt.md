---
title: codebolt
---

# codebolt

Codebolt core events. Access via `client.sockets.codebolt`.

All socket modules extend `TypedEventEmitter` and provide `.on()`, `.off()`, `.once()` for event listening.

## Events

Listen for events using `client.sockets.codebolt.on(event, handler)`:

| Event |
|---|
| `message` |
| `error` |
| `connected` |
| `disconnected` |

```typescript
client.sockets.codebolt.on('message', (data) => {
  console.log(data);
});
```

## Send Methods

| Method |
|---|
| `connect()` |
| `sendMessage()` |

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

// Listen for events
client.sockets.codebolt.on('message', (data) => {
  console.log('message:', data);
});

// Send
client.sockets.codebolt.connect();
```
