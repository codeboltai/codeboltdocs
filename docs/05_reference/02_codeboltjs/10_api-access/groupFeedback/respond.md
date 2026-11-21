---
name: respond
description: Adds a response to a feedback session from a participant.
cbbaseinfo:
  description: Adds a response to a feedback session from a participant.
data:
  name: respond
  category: groupFeedback
  link: respond.md
---

# respond

```text
codebolt.groupFeedback.respond(params: IFeedbackRespondParams): Promise<IFeedbackRespondResponse>
```

Adds a response to a feedback session from a participant.

## When to use it

Submit a participant's response to an existing feedback request.

## Example

### Respond to a feedback request

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const response = await codebolt.groupFeedback.respond({
    feedbackId: 'feedback-id',
    senderId: 'docs-reviewer-id',
    senderName: 'Docs reviewer',
    body: 'The setup section should say which command starts the app.',
  });
  console.log(response);
});
```
