---
title: environmentDebug
---

# environmentDebug

Environment debug events. Access via `client.sockets.environmentDebug`.

All socket modules extend `TypedEventEmitter` and provide `.on()`, `.off()`, `.once()` for event listening.

## Events

Listen for events using `client.sockets.environmentDebug.on(event, handler)`:

| Event |
|---|
| `environment-debug:list` |
| `environment-debug:details` |
| `environment-debug:logs` |
| `environment-debug:session-started` |
| `environment-debug:log` |
| `environment-debug:session-ended` |
| `environment-debug:state-changed` |
| `environment-debug:health-check` |
| `message` |
| `error` |
| `connected` |
| `disconnected` |

```typescript
client.sockets.environmentDebug.on('environment-debug:list', (data) => {
  console.log(data);
});
```

## Send Methods

| Method |
|---|
| `list()` |
| `get()` |
| `getLogs()` |
| `subscribe()` |
| `unsubscribe()` |
| `ping()` |

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

// Listen for events
client.sockets.environmentDebug.on('environment-debug:list', (data) => {
  console.log('environment-debug:list:', data);
});

// Send
client.sockets.environmentDebug.list();
```
