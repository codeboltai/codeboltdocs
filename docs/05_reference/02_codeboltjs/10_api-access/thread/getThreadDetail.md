---
name: getThreadDetail
description: Retrieves detailed information about a specific thread.
cbbaseinfo:
  description: Retrieves detailed information about a specific thread.
data:
  name: getThreadDetail
  category: thread
  link: getThreadDetail.md
---

# getThreadDetail

```text
codebolt.thread.getThreadDetail(options: GetThreadDetailOptions): Promise<GetThreadResponse>
```

Retrieves detailed information about a specific thread.

## Parameters

- `options` — The thread detail options

## Returns

A promise that resolves with the thread detail response

Pass the thread ID as both `taskId` (the SDK option) and `id` (the server lookup field). The example passes an options object containing both fields.

## When to use it

Inspect an existing thread's details before using its state or displaying it in a task view.

## Example

### Fetch the details of an existing thread

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const threadId = 'thread-id';
  const lookup = { taskId: threadId, id: threadId };
  const response = await codebolt.thread.getThreadDetail(lookup);
  console.log(response.thread);
});
```
