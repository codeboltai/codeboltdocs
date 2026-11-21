---
title: updateRequest
---

# updateRequest

Update notifications. Access via `client.sockets.updateRequest`.

All socket modules extend `TypedEventEmitter` and provide `.on()`, `.off()`, `.once()` for event listening.

## Events

Listen for events using `client.sockets.updateRequest.on(event, handler)`:

| Event |
|---|
| `message` |
| `error` |
| `connected` |
| `disconnected` |

```typescript
client.sockets.updateRequest.on('message', (data) => {
  console.log(data);
});
```

## Send Methods

| Method |
|---|
| `list()` |
| `get()` |
| `create()` |
| `update()` |
| `delete()` |
| `submit()` |
| `startWork()` |
| `complete()` |
| `merge()` |

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

// Listen for events
client.sockets.updateRequest.on('message', (data) => {
  console.log('message:', data);
});

// Send
client.sockets.updateRequest.list();
```
