---
name: startThread
description: Starts a thread.
cbbaseinfo:
  description: Starts a thread.
data:
  name: startThread
  category: thread
  link: startThread.md
---

# startThread

```text
codebolt.thread.startThread(threadId: string): Promise<StartThreadResponse>
```

Starts a thread.

## Parameters

- `threadId` — The thread ID to start

## Returns

A promise that resolves with the thread start response

The SDK currently sends `threadId` for this method, while the server's existing-thread handler expects `id`. To start an agent through the SDK, create and start a thread in one request.

## Start an agent in a new thread

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage(async () => {
  const started = await codebolt.thread.createAndStartThread({
    agentId: 'reviewer-agent-id',
    title: 'Documentation review',
    userMessage: 'Check README.md for missing setup steps.',
  });
  return started.success ? started.threadId : started.error;
});
```
