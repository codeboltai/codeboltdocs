---
title: episodicMemory
---

# episodicMemory

Memory events. Access via `client.sockets.episodicMemory`.

All socket modules extend `TypedEventEmitter` and provide `.on()`, `.off()`, `.once()` for event listening.

## Events

Listen for events using `client.sockets.episodicMemory.on(event, handler)`:

| Event |
|---|
| `message` |
| `error` |
| `connected` |
| `disconnected` |

```typescript
client.sockets.episodicMemory.on('message', (data) => {
  console.log(data);
});
```

## Send Methods

| Method |
|---|
| `join()` |
| `leave()` |
| `query()` |
| `getEventTypes()` |
| `getTags()` |
| `getAgents()` |
| `list()` |

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

// Listen for events
client.sockets.episodicMemory.on('message', (data) => {
  console.log('message:', data);
});

// Send
client.sockets.episodicMemory.join();
```
