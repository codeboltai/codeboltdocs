---
name: updateThread
description: Updates an existing thread.
cbbaseinfo:
  description: Updates an existing thread.
data:
  name: updateThread
  category: thread
  link: updateThread.md
---

# updateThread

```text
codebolt.thread.updateThread(threadId: string, updates: UpdateThreadOptions): Promise<UpdateThreadResponse>
```

Updates an existing thread.

## Parameters

- `threadId` — The thread ID to update
- `updates` — The thread update parameters

## Returns

A promise that resolves with the thread update response

Include the thread ID as `id` in the updates object for the server lookup. The SDK passes that object through with the request.

## Rename a thread

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const threadId = 'thread-id';
  const updates = { id: threadId, name: 'README review' };
  const result = await codebolt.thread.updateThread(threadId, updates);
  if (result.success) console.log(result.thread);
});
```

## When to use it

Rename or update a thread record so collaborators can recognize its purpose.
