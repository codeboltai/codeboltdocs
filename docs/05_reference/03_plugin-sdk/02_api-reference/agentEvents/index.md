---
name: agentEvents
cbbaseinfo:
  description: Listen for dynamic events emitted by agents.
data:
  name: agentEvents
  category: agentEvents
  link: index.md
---

# agentEvents

The `agentEvents` module lets plugins listen for dynamic events emitted by agents through `codebolt.agentEvents.emit`.

## Methods

| Method | Description |
|---|---|
| [`onAgentEvent`](./onAgentEvent.md) | Subscribe to all dynamic agent events or a specific event name |

## Event type

Plugins receive application events with type `agent:dynamic:event`.

```ts
{
  type: 'agent:dynamic:event',
  payload: {
    name: string;
    data?: Record<string, unknown>;
    emittedAt: string;
  },
  source?: {
    threadId?: string;
    agentId?: string;
    agentInstanceId?: string;
  }
}
```
