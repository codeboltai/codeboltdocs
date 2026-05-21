---
name: agentEvents
cbbaseinfo:
  description: Emit dynamic agent events into the application event system.
data:
  name: agentEvents
  category: agentEvents
  link: index.md
---

# agentEvents

The `agentEvents` module lets an agent publish named dynamic events. These events enter the application event system as `agent:dynamic:event`, so hooks, plugins, memory ingestion, and context assembly rules can react to them.

## Methods

| Method | Description |
|---|---|
| [`emit`](./emit.md) | Emit a named dynamic agent event |

## Event shape

```ts
{
  type: 'agent:dynamic:event',
  source: {
    projectId?: string;
    threadId?: string;
    agentId?: string;
    agentInstanceId?: string;
    parentAgentInstanceId?: string;
    parentId?: string;
    pluginId?: string;
    swarmId?: string;
    jobId?: string;
  },
  payload: {
    name: string;
    data?: Record<string, unknown>;
    emittedAt: string;
  },
  metadata?: Record<string, unknown>;
}
```

## See also

- [Dynamic Agent Events guide](../../../../04_build-on-codebolt/02_creating-agents/08_dynamic-agent-events.md)
- [Hooks](../../../../02_using-codebolt/08d_auto-interactivity/04_hooks.md)
