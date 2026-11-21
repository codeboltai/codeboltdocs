---
title: eventLog
---

# eventLog

Event log entries. Access via `client.sockets.eventLog`.

All socket modules extend `TypedEventEmitter` and provide `.on()`, `.off()`, `.once()` for event listening.

## Events

Listen for events using `client.sockets.eventLog.on(event, handler)`:

| Event |
|---|
| `eventLog:instance-created` |
| `eventLog:instance-updated` |
| `eventLog:instance-deleted` |
| `eventLog:event-appended` |
| `eventLog:events-appended` |
| `message` |
| `error` |
| `connected` |
| `disconnected` |

```typescript
client.sockets.eventLog.on('eventLog:instance-created', (data) => {
  console.log(data);
});
```

## Send Methods

| Method |
|---|
| `ping()` |
| `subscribe()` |

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

// Listen for events
client.sockets.eventLog.on('eventLog:instance-created', (data) => {
  console.log('eventLog:instance-created:', data);
});

// Send
client.sockets.eventLog.ping();
```
