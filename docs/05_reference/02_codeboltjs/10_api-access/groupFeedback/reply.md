---
name: reply
description: Adds a reply to a specific response in a feedback session, enabling threaded discussions.
cbbaseinfo:
  description: Adds a reply to a specific response in a feedback session, enabling threaded discussions.
data:
  name: reply
  category: groupFeedback
  link: reply.md
---

# reply

**Default server support.** The SDK declares these methods, but the default application server has no handler for the `groupfeedback.*` requests. A caller can wait without receiving a response. To collect responses from agents in the application, use [Agent Deliberation](../agentDeliberation/index.md).

```text
codebolt.groupFeedback.reply(params: IReplyParams): Promise<IReplyResponse>
```

Adds a reply to a specific response in a feedback session, enabling threaded discussions.

## Intended use

Ask a clarifying question or respond to a particular comment by using its response ID.

## Request examples for a compatible server

### Reply to an existing response

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const response = await codebolt.groupFeedback.reply({
    responseId: 'response-id',
    senderId: 'review-coordinator-id',
    senderName: 'Review coordinator',
    body: 'Added the command to the run section.',
  });
  console.log(response);
});
```
