---
title: fileUpdateIntent
---

# fileUpdateIntent

File update events. Access via `client.sockets.fileUpdateIntent`.

All socket modules extend `TypedEventEmitter` and provide `.on()`, `.off()`, `.once()` for event listening.

## Events

Listen for events using `client.sockets.fileUpdateIntent.on(event, handler)`:

| Event |
|---|
| `fileUpdateIntent:created` |
| `fileUpdateIntent:updated` |
| `fileUpdateIntent:deleted` |
| `list` |
| `message` |

```typescript
client.sockets.fileUpdateIntent.on('fileUpdateIntent:created', (data) => {
  console.log(data);
});
```

## Send Methods

| Method |
|---|
| `list()` |

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

// Listen for events
client.sockets.fileUpdateIntent.on('fileUpdateIntent:created', (data) => {
  console.log('fileUpdateIntent:created:', data);
});

// Send
client.sockets.fileUpdateIntent.list();
```
