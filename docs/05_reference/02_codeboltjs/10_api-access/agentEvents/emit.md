---
name: emit
cbbaseinfo:
  description: Emits a named dynamic agent event into Codebolt's application event system.
cbparameters:
  parameters:
    - name: name
      type: string
      required: true
      description: Stable event name, for example plan.ready or test.failed.
    - name: data
      type: Record<string, unknown>
      required: false
      description: JSON-serializable event payload.
    - name: options
      type: EmitAgentEventOptions
      required: false
      description: Optional metadata for the emitted event.
  returns:
    signatureTypeName: "Promise<EmitAgentEventResponse>"
    description: A promise that resolves with the emitted application event.
data:
  name: emit
  category: agentEvents
  link: emit.md
---

# emit

```ts
codebolt.agentEvents.emit(
  name: string,
  data?: Record<string, unknown>,
  options?: { metadata?: Record<string, unknown> }
): Promise<EmitAgentEventResponse>
```

Emits a dynamic agent event. The server records it as an application event with type `agent:dynamic:event`.

## Parameters

- **`name`**: Event name. Use stable dotted names such as `plan.ready`, `test.failed`, or `build.started`.
- **`data`**: Optional JSON-serializable payload.
- **`options.metadata`**: Optional metadata attached to the application event.

## Response

```ts
{
  success: boolean;
  type: 'agentEvents.emitResponse';
  requestId?: string;
  data?: {
    event: {
      id: string;
      type: 'agent:dynamic:event';
      timestamp: string;
      source: Record<string, unknown>;
      payload: {
        name: string;
        data?: Record<string, unknown>;
        emittedAt: string;
      };
      metadata?: Record<string, unknown>;
    };
  };
  error?: string;
}
```

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

await codebolt.agentEvents.emit('plan.ready', {
  filesChanged: 4,
  risk: 'medium',
}, {
  metadata: {
    source: 'planner-agent',
  },
});
```

Hooks can match this event with:

```yaml
when:
  type: dynamicAgentEvent
  eventName: plan.ready
```
