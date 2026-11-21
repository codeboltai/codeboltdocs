---
name: sendMessage
description: Sends a message to a specific mail thread.
cbbaseinfo:
  description: Sends a message to a specific mail thread.
data:
  name: sendMessage
  category: mail
  link: sendMessage.md
---

# sendMessage

```text
codebolt.mail.sendMessage(params: ISendMessageParams): Promise<ISendMessageResponse>
```

Sends a message to a specific mail thread.

## When to use it

Send a review request, progress note, or handoff to an available recipient.

## Example

### Send mail to an available recipient

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage(async () => {
  const response = await codebolt.recipients.options();
  const recipient = (response.recipients ?? response.data ?? []).find(option => option.available);
  if (!recipient) return;

  const message = await codebolt.mail.sendMessage({
    senderId: 'docs-reviewer-id',
    senderName: 'Docs reviewer',
    recipients: [{ address: recipient.address }],
    subject: 'README review',
    body: 'The project overview is ready to review.',
  });
  console.log(message.messageId);
});
```
