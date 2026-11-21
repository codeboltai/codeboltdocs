---
name: updateThreadStatus
description: Updates the status of a thread.
cbbaseinfo:
  description: Updates the status of a thread.
data:
  name: updateThreadStatus
  category: thread
  link: updateThreadStatus.md
---

# updateThreadStatus

```text
codebolt.thread.updateThreadStatus(threadId: string, status: string): Promise<UpdateThreadStatusResponse>
```

Updates the status of a thread.

## Parameters

- `threadId` — The thread ID
- `status` — The new status

## Returns

A promise that resolves with the thread status update response

## When to use it

Record a status change for a thread. Use the execution controls when you need to stop or start agent work.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  async function handleThreadByStatus(threadId: string) {
    const result = await codebolt.thread.updateThreadStatus(threadId, 'processing');

    console.log('Processing thread:', threadId);

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Determine final status based on conditions
    const finalStatus = Math.random() > 0.5 ? 'completed' : 'failed';

    const final = await codebolt.thread.updateThreadStatus(threadId, finalStatus);

    console.log('Thread processing complete. Final status:', final.status);
  }

  // Usage
  await handleThreadByStatus('thread_mno345');
});
```
