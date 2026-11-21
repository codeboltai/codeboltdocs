---
title: agentPortfolio
---

# agentPortfolio

Agent portfolio updates. Access via `client.sockets.agentPortfolio`.

All socket modules extend `TypedEventEmitter` and provide `.on()`, `.off()`, `.once()` for event listening.

## Events

Listen for events using `client.sockets.agentPortfolio.on(event, handler)`:

| Event |
|---|
| `message` |

```typescript
client.sockets.agentPortfolio.on('message', (data) => {
  console.log(data);
});
```

## Send Methods

| Method |
|---|
| `getPortfolio()` |
| `getConversations()` |
| `addTestimonial()` |
| `addKarma()` |
| `subscribe()` |
| `unsubscribe()` |

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

// Listen for events
client.sockets.agentPortfolio.on('message', (data) => {
  console.log('message:', data);
});

// Send
client.sockets.agentPortfolio.getPortfolio();
```
