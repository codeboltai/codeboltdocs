---
name: createAndStartThread
description: Creates and immediately starts a new thread.
cbbaseinfo:
  description: Creates and immediately starts a new thread.
data:
  name: createAndStartThread
  category: thread
  link: createAndStartThread.md
---

# createAndStartThread

```text
codebolt.thread.createAndStartThread(options: CreateAndStartThreadOptions): Promise<StartThreadResponse>
```

Creates and immediately starts a new thread.

## Parameters

- `options` — The thread creation and start parameters

## Returns

A promise that resolves with the thread start response

## When to use it

Delegate a task in one request by providing a target agent and a task message. Keep the resulting thread ID for inspection.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const thread = await codebolt.thread.createAndStartThread({
    title: 'Automated Testing',
    description: 'Run automated test suite for the new feature',
    agentId: 'test-agent',
    metadata: {
      testSuite: 'integration-tests',
      branch: 'feature/user-auth',
      environment: 'staging'
    }
  });

  console.log(`Test thread ${thread.threadId} is now running`);
  // Thread immediately begins executing the automated tests
});
```

## More examples

### Create and Start a Simple Thread

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const thread = await codebolt.thread.createAndStartThread({
    title: 'Quick Code Review',
    description: 'Review the authentication module changes',
    agentId: 'reviewer-agent'
  });

  console.log('Thread started:', thread.threadId);
  console.log('Status:', thread.status);
  // Output: Status: running
});
```
