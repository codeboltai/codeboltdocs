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

```text
codebolt.groupFeedback.updateStatus(params: IUpdateStatusParams): Promise<IUpdateStatusResponse>
```

Updates the status of a feedback session to control its lifecycle.

## When to use it

Move a feedback request to the appropriate workflow state after its discussion or review finishes.

## Example

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
