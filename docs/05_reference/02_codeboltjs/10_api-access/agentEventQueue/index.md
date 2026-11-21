# Agent Event Queue

Consume pending agent events and subscribe to new ones.

Reading pending events consumes them. The queue acknowledges reliable swarm deliveries after consumption, and `onEvent` returns an unsubscribe function.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const pending = await codebolt.agentEventQueue.getPendingEvents();
  console.log(pending);
});
```

## SDK methods

### getPendingEvents

```text
codebolt.agentEventQueue.getPendingEvents(params?: GetPendingEventsInput): Promise<AgentEventMessage[]>
```

### waitForNextEvent

```text
codebolt.agentEventQueue.waitForNextEvent(params?: GetPendingEventsInput): Promise<AgentEventMessage | AgentEventMessage[]>
```

### onEvent

```text
codebolt.agentEventQueue.onEvent(handler: QueueEventHandler): (() => void)
```

### getQueueStats

```text
codebolt.agentEventQueue.getQueueStats(): Promise<AgentEventQueueResponse<QueueStatsResponseData>>
```
