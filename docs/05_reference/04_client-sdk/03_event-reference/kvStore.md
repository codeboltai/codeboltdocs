---
title: kvStore
---

# kvStore

Key-value store events. Access via `client.sockets.kvStore`.

All socket modules extend `TypedEventEmitter` and provide `.on()`, `.off()`, `.once()` for event listening.

## Events

Listen for events using `client.sockets.kvStore.on(event, handler)`:

| Event |
|---|
| `kvStore:instance-created` |
| `kvStore:instance-updated` |
| `kvStore:instance-deleted` |
| `kvStore:record-set` |
| `kvStore:record-deleted` |
| `kvStore:namespace-cleared` |
| `message` |

```typescript
client.sockets.kvStore.on('kvStore:instance-created', (data) => {
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
client.sockets.kvStore.on('kvStore:instance-created', (data) => {
  console.log('kvStore:instance-created:', data);
});

// Send
client.sockets.kvStore.ping();
```
