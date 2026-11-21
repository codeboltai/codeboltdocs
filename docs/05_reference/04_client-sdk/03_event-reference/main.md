---
title: main
---

# main

Main connection events. Access via `client.sockets.main`.

All socket modules extend `TypedEventEmitter` and provide `.on()`, `.off()`, `.once()` for event listening.

## Events

Listen for events using `client.sockets.main.on(event, handler)`:

| Event |
|---|
| `message` |
| `error` |
| `connected` |
| `disconnected` |

```typescript
client.sockets.main.on('message', (data) => {
  console.log(data);
});
```

## Send Methods

| Method |
|---|
| `send()` |

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

// Listen for events
client.sockets.main.on('message', (data) => {
  console.log('message:', data);
});

// Send
client.sockets.main.send();
```
