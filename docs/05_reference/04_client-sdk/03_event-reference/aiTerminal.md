---
title: aiTerminal
---

# aiTerminal

AI terminal interaction. Access via `client.sockets.aiTerminal`.

All socket modules extend `TypedEventEmitter` and provide `.on()`, `.off()`, `.once()` for event listening.

## Events

Listen for events using `client.sockets.aiTerminal.on(event, handler)`:

| Event |
|---|
| `output` |
| `logRestore` |
| `message` |
| `connected` |

```typescript
client.sockets.aiTerminal.on('output', (data) => {
  console.log(data);
});
```

## Send Methods

| Method |
|---|
| `send()` |
| `resize()` |
| `ping()` |
| `requestHistory()` |

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

// Listen for events
client.sockets.aiTerminal.on('output', (data) => {
  console.log('output:', data);
});

// Send
client.sockets.aiTerminal.send();
```
