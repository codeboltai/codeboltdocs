---
title: swarm
---

# swarm

Swarm coordination events. Access via `client.sockets.swarm`.

All socket modules extend `TypedEventEmitter` and provide `.on()`, `.off()`, `.once()` for event listening.

## Events

Listen for events using `client.sockets.swarm.on(event, handler)`:

| Event |
|---|
| `agent:registered` |
| `agent:unregistered` |
| `agent:status-changed` |
| `team:member-joined` |
| `team:member-left` |
| `role:assigned` |
| `role:unassigned` |
| `vacancy:created` |
| `vacancy:closed` |
| `swarm:event` |
| `swarm:terminated` |
| `swarm:config-updated` |
| `swarm:status-changed` |
| `swarm:agent-started` |
| `swarm:agent-completed` |
| `connected` |
| `disconnected` |

```typescript
client.sockets.swarm.on('agent:registered', (data) => {
  console.log(data);
});
```

## Send Methods

| Method |
|---|
| `joinSwarm()` |
| `leaveSwarm()` |
| `registerAgent()` |
| `unregisterAgent()` |
| `updateAgentStatus()` |
| `startSwarm()` |
| `stopSwarm()` |
| `getSwarmStatus()` |

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

// Listen for events
client.sockets.swarm.on('agent:registered', (data) => {
  console.log('agent:registered:', data);
});

// Send
client.sockets.swarm.joinSwarm();
```
