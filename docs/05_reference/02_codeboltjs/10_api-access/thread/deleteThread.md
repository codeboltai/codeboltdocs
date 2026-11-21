---
name: deleteThread
description: Deletes a thread.
cbbaseinfo:
  description: Deletes a thread.
data:
  name: deleteThread
  category: thread
  link: deleteThread.md
---

# deleteThread

```text
codebolt.thread.deleteThread(threadId: string): Promise<DeleteThreadResponse>
```

Deletes a thread.

## Parameters

- `threadId` — The thread ID to delete

## Returns

A promise that resolves with the thread deletion response

The SDK sends `threadId`, while the current server delete handler expects `id`. The call can return an error for a valid thread ID. Check `success` and `deleted` before treating a thread as removed.

## Handle the delete result

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.thread.deleteThread('thread-id');
  if (!result.success || !result.deleted) {
    console.error(result.error ?? 'The server did not confirm deletion.');
  }
});
```
