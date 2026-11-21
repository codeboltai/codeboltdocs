---
title: jobs
---

# jobs

Job monitoring events. Access via `client.sockets.jobs`.

All socket modules extend `TypedEventEmitter` and provide `.on()`, `.off()`, `.once()` for event listening.

## Events

Listen for events using `client.sockets.jobs.on(event, handler)`:

| Event |
|---|
| `message` |

```typescript
client.sockets.jobs.on('message', (data) => {
  console.log(data);
});
```

## Send Methods

| Method |
|---|
| `list()` |
| `get()` |
| `groups()` |
| `labels()` |
| `ready()` |
| `blocked()` |
| `listEvents()` |
| `getEvent()` |

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

// Listen for events
client.sockets.jobs.on('message', (data) => {
  console.log('message:', data);
});

// Send
client.sockets.jobs.list();
```
