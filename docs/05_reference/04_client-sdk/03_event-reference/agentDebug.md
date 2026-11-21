---
title: agentDebug
---

# agentDebug

Agent debugging events. Access via `client.sockets.agentDebug`.

All socket modules extend `TypedEventEmitter` and provide `.on()`, `.off()`, `.once()` for event listening.

## Events

Listen for events using `client.sockets.agentDebug.on(event, handler)`:

| Event |
|---|
| `agent-debug:list` |
| `agent-debug:details` |
| `agent-debug:logs` |
| `agent-debug:session-started` |
| `agent-debug:log` |
| `agent-debug:session-ended` |
| `message` |
| `error` |
| `connected` |
| `disconnected` |

```typescript
client.sockets.agentDebug.on('agent-debug:list', (data) => {
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
client.sockets.agentDebug.on('agent-debug:list', (data) => {
  console.log('agent-debug:list:', data);
});

// Send
client.sockets.agentDebug.list();
```
