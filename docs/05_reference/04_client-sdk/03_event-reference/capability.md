---
title: capability
---

# capability

Capability updates. Access via `client.sockets.capability`.

All socket modules extend `TypedEventEmitter` and provide `.on()`, `.off()`, `.once()` for event listening.

## Events

Listen for events using `client.sockets.capability.on(event, handler)`:

| Event |
|---|
| `capabilities` |
| `executors` |
| `capabilityTypes` |
| `activeExecutions` |
| `capabilityExecutionStarted` |
| `capabilityExecutionResult` |
| `capabilityChanged` |
| `executorChanged` |
| `registryRefreshed` |
| `message` |
| `error` |
| `connected` |
| `disconnected` |

```typescript
client.sockets.capability.on('capabilities', (data) => {
  console.log(data);
});
```

## Send Methods

| Method |
|---|
| `getCapabilities()` |
| `getExecutors()` |
| `getCapabilityTypes()` |
| `refresh()` |
| `getActiveExecutions()` |

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

// Listen for events
client.sockets.capability.on('capabilities', (data) => {
  console.log('capabilities:', data);
});

// Send
client.sockets.capability.getCapabilities();
```
