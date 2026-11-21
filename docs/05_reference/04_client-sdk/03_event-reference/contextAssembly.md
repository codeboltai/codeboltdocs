---
title: contextAssembly
---

# contextAssembly

Context assembly events. Access via `client.sockets.contextAssembly`.

All socket modules extend `TypedEventEmitter` and provide `.on()`, `.off()`, `.once()` for event listening.

## Events

Listen for events using `client.sockets.contextAssembly.on(event, handler)`:

| Event |
|---|
| `contextAssembly:started` |
| `contextAssembly:rulesEvaluated` |
| `contextAssembly:pipelineComplete` |
| `contextAssembly:complete` |
| `contextAssembly:error` |
| `message` |

```typescript
client.sockets.contextAssembly.on('contextAssembly:started', (data) => {
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
client.sockets.contextAssembly.on('contextAssembly:started', (data) => {
  console.log('contextAssembly:started:', data);
});

// Send
client.sockets.contextAssembly.ping();
```
