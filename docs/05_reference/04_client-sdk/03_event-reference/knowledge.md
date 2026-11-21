---
title: knowledge
---

# knowledge

Knowledge base events. Access via `client.sockets.knowledge`.

All socket modules extend `TypedEventEmitter` and provide `.on()`, `.off()`, `.once()` for event listening.

## Events

Listen for events using `client.sockets.knowledge.on(event, handler)`:

| Event |
|---|
| `knowledge:collection-created` |
| `knowledge:collection-updated` |
| `knowledge:collection-deleted` |
| `knowledge:document-added` |
| `knowledge:document-deleted` |
| `knowledge:chunking-started` |
| `knowledge:chunking-progress` |
| `knowledge:chunking-completed` |
| `knowledge:chunking-failed` |
| `knowledge:chunk-updated` |
| `message` |

```typescript
client.sockets.knowledge.on('knowledge:collection-created', (data) => {
  console.log(data);
});
```

## Send Methods

| Method |
|---|
| `ping()` |
| `subscribe()` |

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

// Listen for events
client.sockets.knowledge.on('knowledge:collection-created', (data) => {
  console.log('knowledge:collection-created:', data);
});

// Send
client.sockets.knowledge.ping();
```
