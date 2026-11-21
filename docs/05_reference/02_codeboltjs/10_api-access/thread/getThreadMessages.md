---
name: getThreadMessages
description: Retrieves messages for a specific thread.
cbbaseinfo:
  description: Retrieves messages for a specific thread.
data:
  name: getThreadMessages
  category: thread
  link: getThreadMessages.md
---

# getThreadMessages

```text
codebolt.thread.getThreadMessages(options: GetThreadMessagesOptions): Promise<GetThreadMessagesResponse>
```

Retrieves messages for a specific thread.

## Parameters

- `options` — The thread messages options

## Returns

A promise that resolves with the thread messages response

## When to use it

Read the messages recorded for one thread. Paginate the query when reviewing a long conversation.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const threadId = 'thread_abc123';
  const result = await codebolt.thread.getThreadMessages({
    threadId
  });
  console.log(result);
});
```

## Read a page of messages from the current thread

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage(async () => {
  const threadId = codebolt.userMessage.getThreadId();
  if (!threadId) return;
  const response = await codebolt.thread.getThreadMessages({ threadId, taskId: threadId, limit: 20, offset: 0 });
  if (response.success) console.log(response.messages ?? []);
});
```
