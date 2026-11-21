---
name: findOrCreateThread
description: Finds an existing thread or creates a new one based on participants and subject.
cbbaseinfo:
  description: Finds an existing thread or creates a new one based on participants and subject.
data:
  name: findOrCreateThread
  category: mail
  link: findOrCreateThread.md
---

# findOrCreateThread

```text
codebolt.mail.findOrCreateThread(params: IFindOrCreateThreadParams): Promise<IFindOrCreateThreadResponse>
```

Finds an existing thread or creates a new one based on participants and subject.

## When to use it

Find or create a thread when a workflow may already have a conversation for the same topic and participants.

## Example

### Find or Create Thread

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.mail.findOrCreateThread({
    subject: 'Bug Fix: Login Issue',
    participants: ['agent-001', 'agent-002'],
    type: 'agent-to-agent'
  });

  if (result.created) {
    if (result.thread == null) throw new Error('The response is missing thread.');
    console.log('New thread created:', result.thread.id);
  } else {
    if (result.thread == null) throw new Error('The response is missing thread.');
    console.log('Existing thread found:', result.thread.id);
  }
});
```
