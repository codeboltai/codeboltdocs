---
name: waitforReply
description: Waits for a reply to a sent message.
cbbaseinfo:
  description: Waits for a reply to a sent message.
data:
  name: waitforReply
  category: chat
  link: waitforReply.md
---

# waitforReply

```text
codebolt.chat.waitforReply(message: string): Promise<UserMessage>
```

Waits for a reply to a sent message.

## Parameters

- `message` — The message for which a reply is expected.

## Returns

A promise that resolves with the reply.

## When to use it

Ask for a file path or another missing input when the agent needs an answer before it can continue.

## Example

### Ask a question and wait for the reply

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage(async () => {
  const reply = await codebolt.chat.waitforReply('Which file should I review?');
  console.log(reply);
});
```
