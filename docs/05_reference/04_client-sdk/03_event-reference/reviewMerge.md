---
title: reviewMerge
---

# reviewMerge

Code review/merge events. Access via `client.sockets.reviewMerge`.

All socket modules extend `TypedEventEmitter` and provide `.on()`, `.off()`, `.once()` for event listening.

## Events

Listen for events using `client.sockets.reviewMerge.on(event, handler)`:

| Event |
|---|
| `message` |
| `error` |
| `connected` |
| `disconnected` |

```typescript
client.sockets.reviewMerge.on('message', (data) => {
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
| `addReview()` |
| `updateStatus()` |
| `merge()` |

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

// Listen for events
client.sockets.reviewMerge.on('message', (data) => {
  console.log('message:', data);
});

// Send
client.sockets.reviewMerge.list();
```
