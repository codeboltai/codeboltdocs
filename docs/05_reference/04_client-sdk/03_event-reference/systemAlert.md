---
title: systemAlert
---

# systemAlert

System alerts. Access via `client.sockets.systemAlert`.

All socket modules extend `TypedEventEmitter` and provide `.on()`, `.off()`, `.once()` for event listening.

## Events

Listen for events using `client.sockets.systemAlert.on(event, handler)`:

| Event |
|---|
| `system-alert:created` |
| `system-alert:updated` |
| `system-alert:removed` |
| `system-alert:cleared` |
| `system-alert:all` |
| `alert` |
| `message` |
| `error` |
| `connected` |
| `disconnected` |

```typescript
client.sockets.systemAlert.on('system-alert:created', (data) => {
  console.log(data);
});
```

## Send Methods

| Method |
|---|
| `getAll()` |
| `create()` |
| `update()` |
| `remove()` |
| `markRead()` |
| `clearAll()` |
| `ping()` |

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

// Listen for events
client.sockets.systemAlert.on('system-alert:created', (data) => {
  console.log('system-alert:created:', data);
});

// Send
client.sockets.systemAlert.getAll();
```
