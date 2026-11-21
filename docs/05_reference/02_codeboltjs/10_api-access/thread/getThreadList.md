---
name: getThreadList
description: Retrieves a list of threads with optional filtering.
cbbaseinfo:
  description: Retrieves a list of threads with optional filtering.
data:
  name: getThreadList
  category: thread
  link: getThreadList.md
---

# getThreadList

```text
codebolt.thread.getThreadList(options?: GetThreadListOptions): Promise<ListThreadsResponse>
```

Retrieves a list of threads with optional filtering.

## Parameters

- `options` — Optional filters for threads

## Returns

A promise that resolves with the thread list response

## When to use it

Populate a thread picker or review queue by listing existing threads and filtering to the ones relevant to the task.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.thread.getThreadList();
  console.log(result);
});
```

## Read the first page of threads

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const response = await codebolt.thread.getThreadList({ limit: 20, offset: 0 });
  if (!response.success) throw new Error(response.error ?? 'Could not list threads.');
  console.log(response.threads ?? [], response.totalCount);
});
```
