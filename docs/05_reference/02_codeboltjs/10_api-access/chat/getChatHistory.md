---
name: getChatHistory
description: Retrieves the chat history response for the supplied thread ID.
cbbaseinfo:
  description: Retrieves the chat history response for the supplied thread ID.
data:
  name: getChatHistory
  category: chat
  link: getChatHistory.md
---

# getChatHistory

```text
codebolt.chat.getChatHistory(threadId: string): Promise<ChatMessage>
```

Retrieves the chat history response for the supplied thread ID.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage(async () => {
  const threadId = codebolt.userMessage.getThreadId();
  if (!threadId) return;
  console.log(await codebolt.chat.getChatHistory(threadId));
});
```
