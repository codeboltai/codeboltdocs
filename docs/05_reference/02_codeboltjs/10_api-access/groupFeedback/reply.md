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

```text
codebolt.groupFeedback.reply(params: IReplyParams): Promise<IReplyResponse>
```

Adds a reply to a specific response in a feedback session, enabling threaded discussions.

## When to use it

Ask a clarifying question or respond to a particular comment by using its response ID.

## Example

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
