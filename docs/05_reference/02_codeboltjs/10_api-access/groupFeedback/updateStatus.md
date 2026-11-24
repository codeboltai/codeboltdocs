---
name: updateStatus
description: Updates the status of a feedback session to control its lifecycle.
cbbaseinfo:
  description: Updates the status of a feedback session to control its lifecycle.
data:
  name: updateStatus
  category: groupFeedback
  link: updateStatus.md
---

# updateStatus

**Default server support.** The SDK declares these methods, but the default application server has no handler for the `groupfeedback.*` requests. A caller can wait without receiving a response. To collect responses from agents in the application, use [Agent Deliberation](../agentDeliberation/index.md).

```text
codebolt.groupFeedback.updateStatus(params: IUpdateStatusParams): Promise<IUpdateStatusResponse>
```

Updates the status of a feedback session to control its lifecycle.

## Intended use

Move a feedback request to the appropriate workflow state after its discussion or review finishes.

## Request examples for a compatible server

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.groupFeedback.updateStatus({
    feedbackId: 'feedback-123',
    status: 'closed'
  });

  console.log('Feedback session closed');
});
```
