---
title: debug
---

# debug

Debug session events. Access via `client.sockets.debug`.

All socket modules extend `TypedEventEmitter` and provide `.on()`, `.off()`, `.once()` for event listening.

## Events

Listen for events using `client.sockets.debug.on(event, handler)`:

| Event |
|---|
| `message` |
| `error` |
| `connected` |
| `disconnected` |

```typescript
client.sockets.debug.on('message', (data) => {
  console.log(data);
});
```

## Send Methods

_None — read-only socket._

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

// Listen for events
client.sockets.debug.on('message', (data) => {
  console.log('message:', data);
});
```
