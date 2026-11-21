---
title: projectStructure
---

# projectStructure

Project structure changes. Access via `client.sockets.projectStructure`.

All socket modules extend `TypedEventEmitter` and provide `.on()`, `.off()`, `.once()` for event listening.

## Events

Listen for events using `client.sockets.projectStructure.on(event, handler)`:

| Event |
|---|
| `message` |
| `error` |
| `connected` |
| `disconnected` |

```typescript
client.sockets.projectStructure.on('message', (data) => {
  console.log(data);
});
```

## Send Methods

| Method |
|---|
| `getMetadata()` |
| `updateMetadata()` |
| `getPackages()` |
| `updatePackages()` |
| `getRoutes()` |
| `updateRoutes()` |

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

// Listen for events
client.sockets.projectStructure.on('message', (data) => {
  console.log('message:', data);
});

// Send
client.sockets.projectStructure.getMetadata();
```
