---
title: persistentMemory
---

# persistentMemory

Persistent memory events. Access via `client.sockets.persistentMemory`.

All socket modules extend `TypedEventEmitter` and provide `.on()`, `.off()`, `.once()` for event listening.

## Events

Listen for events using `client.sockets.persistentMemory.on(event, handler)`:

| Event |
|---|
| `persistentMemory:created` |
| `persistentMemory:updated` |
| `persistentMemory:deleted` |
| `persistentMemory:pipeline-executed` |
| `message` |

```typescript
client.sockets.persistentMemory.on('persistentMemory:created', (data) => {
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
client.sockets.persistentMemory.on('persistentMemory:created', (data) => {
  console.log('persistentMemory:created:', data);
});

// Send
client.sockets.persistentMemory.ping();
```
