---
name: getMessages
description: Retrieves all messages from a specific mail thread.
cbbaseinfo:
  description: Retrieves all messages from a specific mail thread.
data:
  name: getMessages
  category: mail
  link: getMessages.md
---

# getMessages

```text
codebolt.mail.getMessages(params: IGetMessagesParams): Promise<IGetMessagesResponse>
```

Retrieves all messages from a specific mail thread.

## When to use it

Read the messages in a mail thread for review or context.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.mail.getMessages({
    threadId: 'thread-123'
  });
  console.log(result);
});
```
