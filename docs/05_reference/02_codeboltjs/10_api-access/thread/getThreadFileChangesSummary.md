---
name: getThreadFileChangesSummary
description: Retrieves file changes summary for ChangesSummaryPanel.
cbbaseinfo:
  description: Retrieves file changes summary for ChangesSummaryPanel.
data:
  name: getThreadFileChangesSummary
  category: thread
  link: getThreadFileChangesSummary.md
---

# getThreadFileChangesSummary

```text
codebolt.thread.getThreadFileChangesSummary(threadId: string): Promise<ThreadFileChangesSummaryResponse>
```

Retrieves file changes summary for ChangesSummaryPanel.
Returns an object with `title`, `changes`, and `files` fields.

## Parameters

- `threadId` — The thread ID

## Returns

A promise that resolves with the file changes summary

## When to use it

Show an overview of recorded file changes before opening individual diffs.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const threadId = 'thread_abc123';
  const result = await codebolt.thread.getThreadFileChangesSummary(threadId);
  console.log(result);
});
```

## Report recorded file changes for the active thread

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage(async () => {
  const threadId = codebolt.userMessage.getThreadId();
  if (!threadId) return;
  const response = await codebolt.thread.getThreadFileChangesSummary(threadId);
  console.log(response);
});
```
