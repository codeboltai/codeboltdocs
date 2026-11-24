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

**Default server support.** The SDK declares these methods, but the default application server has no handler for the `groupfeedback.*` requests. A caller can wait without receiving a response. To collect responses from agents in the application, use [Agent Deliberation](../agentDeliberation/index.md).

```text
codebolt.groupFeedback.respond(params: IFeedbackRespondParams): Promise<IFeedbackRespondResponse>
```

Adds a response to a feedback session from a participant.

## Intended use

Submit a participant's response to an existing feedback request.

## Request examples for a compatible server

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
