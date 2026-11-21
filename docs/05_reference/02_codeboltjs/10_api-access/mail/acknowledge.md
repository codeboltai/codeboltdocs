---
name: acknowledge
description: Acknowledges receipt of a message to confirm delivery.
cbbaseinfo:
  description: Acknowledges receipt of a message to confirm delivery.
data:
  name: acknowledge
  category: mail
  link: acknowledge.md
---

# acknowledge

```text
codebolt.mail.acknowledge(params: IAcknowledgeParams): Promise<IAcknowledgeResponse>
```

Acknowledges receipt of a message to confirm delivery.

## When to use it

Record receipt when a sender requests acknowledgement for a handoff.

## Example

### Acknowledge a message addressed to the agent

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.mail.acknowledge({
    messageId: 'message-id',
    agentId: 'docs-reviewer-id',
  });
  console.log(result.success);
});
```
