---
name: createThread
description: Creates a new thread with comprehensive options.
cbbaseinfo:
  description: Creates a new thread with comprehensive options.
data:
  name: createThread
  category: thread
  link: createThread.md
---

# createThread

```text
codebolt.thread.createThread(options: CreateThreadOptions): Promise<CreateThreadResponse>
```

Creates a new thread with comprehensive options.

## Parameters

- `options` — The thread creation parameters

## Returns

A promise that resolves with the thread creation response

The example sets a thread ID and a title before creating the thread. The server returns the new record in `thread`.

## When to use it

Create a record to organize work or metadata before execution begins.

## Example

### Create a thread and retrieve its details

```ts
import { randomUUID } from 'node:crypto';
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const threadId = randomUUID();
  const options = {
    threadId,
    name: 'README review',
    title: 'README review',
    description: 'Track feedback on the project overview.',
  };
  const created = await codebolt.thread.createThread(options);
  if (!created.success) throw new Error(created.error ?? 'Thread creation failed.');

  const lookup = { taskId: threadId, id: threadId };
  const response = await codebolt.thread.getThreadDetail(lookup);
  console.log(response.thread);
});
```
