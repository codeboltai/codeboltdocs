---
name: getThreadFileChanges
description: Retrieves file changes associated with a specific thread.
cbbaseinfo:
  description: Retrieves file changes associated with a specific thread.
data:
  name: getThreadFileChanges
  category: thread
  link: getThreadFileChanges.md
---

# getThreadFileChanges

```text
codebolt.thread.getThreadFileChanges(threadId: string): Promise<ThreadFileChangesResponse>
```

Retrieves file changes associated with a specific thread.

## Parameters

- `threadId` — The thread ID

## Returns

A promise that resolves with the file changes

## When to use it

Review recorded file changes for a specific thread to understand the scope of its edits.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const threadId = 'thread_abc123';
  const result = await codebolt.thread.getThreadFileChanges(threadId);
  console.log(result);
});
```

## Review the recorded changes for the active thread

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage(async () => {
  const threadId = codebolt.userMessage.getThreadId();
  if (!threadId) return;
  const response = await codebolt.thread.getThreadFileChanges(threadId);
  console.log(response);
});
```
