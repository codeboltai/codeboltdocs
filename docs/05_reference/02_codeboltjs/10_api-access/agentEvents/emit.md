---
name: emit
description: Emits a named dynamic agent event into Codebolt's application event system.
cbbaseinfo:
  description: Emits a named dynamic agent event into Codebolt's application event system.
data:
  name: emit
  category: agentEvents
  link: emit.md
---

# emit

```text
codebolt.agentEvents.emit(name: string, data?: Record<string, any>, options?: EmitAgentEventOptions): Promise<EmitAgentEventResponse>
```

Emits a named dynamic agent event into Codebolt's application event system.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.agentEvents.emit('plan.ready', {
    filesChanged: 4,
    risk: 'medium',
  }, {
    metadata: {
      source: 'planner-agent',
    },
  });
});
```
