---
title: localModel
---

# localModel

Local model events. Access via `client.sockets.localModel`.

All socket modules extend `TypedEventEmitter` and provide `.on()`, `.off()`, `.once()` for event listening.

## Events

Listen for events using `client.sockets.localModel.on(event, handler)`:

| Event |
|---|
| `local-model:download-started` |
| `local-model:download-progress` |
| `local-model:download-complete` |
| `local-model:download-error` |
| `local-model:deleted` |
| `message` |
| `error` |
| `connected` |
| `disconnected` |

```typescript
client.sockets.localModel.on('local-model:download-started', (data) => {
  console.log(data);
});
```

## Send Methods

| Method |
|---|
| `ping()` |

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

// Listen for events
client.sockets.localModel.on('local-model:download-started', (data) => {
  console.log('local-model:download-started:', data);
});

// Send
client.sockets.localModel.ping();
```
