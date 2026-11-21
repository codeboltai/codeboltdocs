---
name: markRead
description: Marks a message or thread as read.
cbbaseinfo:
  description: Marks a message or thread as read.
data:
  name: markRead
  category: mail
  link: markRead.md
---

# markRead

```text
codebolt.mail.markRead(params: IMarkReadParams): Promise<IMarkReadResponse>
```

Marks a message or thread as read.

## When to use it

Update the read state after the recipient opens a message.

## Example

### Mark a message as read

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.mail.markRead({
    messageId: 'message-id',
    agentId: 'docs-reviewer-id',
  });
  console.log(result.success);
});
```
