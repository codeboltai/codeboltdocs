---
title: orchestrator
---

# orchestrator

Orchestration events. Access via `client.sockets.orchestrator`.

All socket modules extend `TypedEventEmitter` and provide `.on()`, `.off()`, `.once()` for event listening.

## Events

Listen for events using `client.sockets.orchestrator.on(event, handler)`:

| Event |
|---|
| `orchestrator:thread-update` |
| `orchestrator:message-update` |
| `message` |
| `connected` |

```typescript
client.sockets.orchestrator.on('orchestrator:thread-update', (data) => {
  console.log(data);
});
```

## Send Methods

| Method |
|---|
| `subscribe()` |
| `unsubscribe()` |
| `ping()` |

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

// Listen for events
client.sockets.orchestrator.on('orchestrator:thread-update', (data) => {
  console.log('orchestrator:thread-update:', data);
});

// Send
client.sockets.orchestrator.subscribe();
```
