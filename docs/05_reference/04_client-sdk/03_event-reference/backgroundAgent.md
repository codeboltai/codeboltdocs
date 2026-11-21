---
title: backgroundAgent
---

# backgroundAgent

Background agent events. Access via `client.sockets.backgroundAgent`.

All socket modules extend `TypedEventEmitter` and provide `.on()`, `.off()`, `.once()` for event listening.

## Events

Listen for events using `client.sockets.backgroundAgent.on(event, handler)`:

| Event |
|---|
| `background-agent:list` |
| `background-agent:details` |
| `background-agent:started` |
| `background-agent:status-update` |
| `background-agent:log` |
| `background-agent:stopped` |
| `message` |

```typescript
client.sockets.backgroundAgent.on('background-agent:list', (data) => {
  console.log(data);
});
```

## Send Methods

| Method |
|---|
| `list()` |
| `get()` |
| `subscribe()` |
| `ping()` |

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

// Listen for events
client.sockets.backgroundAgent.on('background-agent:list', (data) => {
  console.log('background-agent:list:', data);
});

// Send
client.sockets.backgroundAgent.list();
```
