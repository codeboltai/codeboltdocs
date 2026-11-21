---
name: summarizeThread
description: Generates a summary of a mail thread's conversation.
cbbaseinfo:
  description: Generates a summary of a mail thread's conversation.
data:
  name: summarizeThread
  category: mail
  link: summarizeThread.md
---

# summarizeThread

```text
codebolt.mail.summarizeThread(params: ISummarizeThreadParams): Promise<ISummarizeThreadResponse>
```

Generates a summary of a mail thread's conversation.

## When to use it

Summarize an existing mail conversation before handing the work to another agent.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.mail.summarizeThread({
    threadId: 'thread-123'
  });
  console.log(result);
});
```
