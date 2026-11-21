---
title: roadmap
---

# roadmap

Roadmap updates. Access via `client.sockets.roadmap`.

All socket modules extend `TypedEventEmitter` and provide `.on()`, `.off()`, `.once()` for event listening.

## Events

Listen for events using `client.sockets.roadmap.on(event, handler)`:

| Event |
|---|
| `message` |
| `error` |
| `connected` |
| `disconnected` |

```typescript
client.sockets.roadmap.on('message', (data) => {
  console.log(data);
});
```

## Send Methods

| Method |
|---|
| `getRoadmap()` |
| `createPhase()` |
| `updatePhase()` |
| `deletePhase()` |
| `createFeature()` |
| `updateFeature()` |
| `deleteFeature()` |

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

// Listen for events
client.sockets.roadmap.on('message', (data) => {
  console.log('message:', data);
});

// Send
client.sockets.roadmap.getRoadmap();
```
