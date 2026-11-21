---
title: iconView
---

# iconView

Icon view updates. Access via `client.sockets.iconView`.

All socket modules extend `TypedEventEmitter` and provide `.on()`, `.off()`, `.once()` for event listening.

## Events

Listen for events using `client.sockets.iconView.on(event, handler)`:

| Event |
|---|
| `icon-view:message` |
| `icon-view:initial` |
| `icon-view:history` |
| `icon-view:detail` |
| `message` |
| `error` |
| `connected` |
| `disconnected` |

```typescript
client.sockets.iconView.on('icon-view:message', (data) => {
  console.log(data);
});
```

## Send Methods

| Method |
|---|
| `subscribe()` |
| `unsubscribe()` |
| `getHistory()` |
| `getDetail()` |
| `ping()` |

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

// Listen for events
client.sockets.iconView.on('icon-view:message', (data) => {
  console.log('icon-view:message:', data);
});

// Send
client.sockets.iconView.subscribe();
```
