---
name: onAgentEvent
cbbaseinfo:
  description: Subscribes a plugin to dynamic events emitted by agents.
cbparameters:
  parameters:
    - name: nameOrFilter
      type: string | AgentEventFilter | ApplicationEventHandler
      required: true
      description: Event name, filter object, or handler for all dynamic agent events.
    - name: handler
      type: ApplicationEventHandler
      required: false
      description: Handler called when a matching dynamic agent event is emitted.
  returns:
    signatureTypeName: "Promise<{ subscriptionId: string; unsubscribe: () => Promise<void> }>"
    description: Subscription metadata and an unsubscribe function.
data:
  name: onAgentEvent
  category: agentEvents
  link: onAgentEvent.md
---

# onAgentEvent

```ts
plugin.agentEvents.onAgentEvent(
  nameOrFilter: string | AgentEventFilter | ApplicationEventHandler,
  handler?: ApplicationEventHandler
): Promise<{ subscriptionId: string; unsubscribe: () => Promise<void> }>
```

Subscribes the plugin to dynamic agent events. Pass a string to listen for one event name, pass a filter object for advanced filtering, or pass a handler directly to receive every dynamic agent event.

## Examples

### Listen for one event

```ts
import plugin from '@codebolt/plugin-sdk';

plugin.onStart(async () => {
  await plugin.agentEvents.onAgentEvent('test.failed', async (event) => {
    console.log(event.payload?.data);
  });
});
```

### Listen for all dynamic agent events

```ts
await plugin.agentEvents.onAgentEvent(async (event) => {
  console.log(event.payload?.name, event.payload?.data);
});
```

### Use an advanced filter

```ts
await plugin.agentEvents.onAgentEvent(
  {
    eventName: 'test.failed',
    filter: {
      conditions: [
        { field: 'payload.data.suite', op: '=', value: 'unit' },
      ],
    },
  },
  async (event) => {
    console.log('Unit tests failed:', event.payload?.data);
  },
);
```

## Unsubscribe

```ts
const subscription = await plugin.agentEvents.onAgentEvent('plan.ready', handler);

await subscription.unsubscribe();
```
