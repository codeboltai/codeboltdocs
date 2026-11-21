---
title: browser
---

# browser

Browser automation events. Access via `client.sockets.browser`.

All socket modules extend `TypedEventEmitter` and provide `.on()`, `.off()`, `.once()` for event listening.

## Events

Listen for events using `client.sockets.browser.on(event, handler)`:

| Event |
|---|
| `message` |
| `error` |
| `connected` |
| `disconnected` |

```typescript
client.sockets.browser.on('message', (data) => {
  console.log(data);
});
```

## Send Methods

| Method |
|---|
| `sendEvent()` |

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

// Listen for events
client.sockets.browser.on('message', (data) => {
  console.log('message:', data);
});

// Send
client.sockets.browser.sendEvent();
```
