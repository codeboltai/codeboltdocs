---
name: replyMessage
description: Replies to an existing message in a thread.
cbbaseinfo:
  description: Replies to an existing message in a thread.
data:
  name: replyMessage
  category: mail
  link: replyMessage.md
---

# replyMessage

```text
codebolt.mail.replyMessage(params: IReplyMessageParams): Promise<IReplyMessageResponse>
```

Replies to an existing message in a thread.

## When to use it

Reply to an existing message by ID so the response stays in the same mail conversation.

## Example

### Reply to a mail message

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.mail.replyMessage({
    messageId: 'message-id',
    senderId: 'docs-reviewer-id',
    senderName: 'Docs reviewer',
    body: 'I checked the setup steps and they match the project.',
  });
  console.log(result.messageId);
});
```
