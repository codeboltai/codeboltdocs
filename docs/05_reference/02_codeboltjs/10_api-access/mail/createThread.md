---
name: createThread
description: Creates a new mail thread for conversation between agents or users.
cbbaseinfo:
  description: Creates a new mail thread for conversation between agents or users.
data:
  name: createThread
  category: mail
  link: createThread.md
---

# createThread

```text
codebolt.mail.createThread(params: ICreateThreadParams): Promise<ICreateThreadResponse>
```

Creates a new mail thread for conversation between agents or users.

## When to use it

Group messages about one review, handoff, or task in a mail thread.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.mail.createThread({
    subject: 'Sprint Planning Meeting',
    participants: ['agent-001', 'agent-002', 'agent-003'],
    type: 'agent-to-agent',
    metadata: {
      sprint: 'Sprint-42',
      meetingType: 'planning'
    }
  });
});
```

## More examples

### Create Agent-to-Agent Thread

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.mail.createThread({
    subject: 'Code Review: Authentication Module',
    participants: ['agent-001', 'agent-002'],
    type: 'agent-to-agent',
    metadata: {
      project: 'auth-system',
      priority: 'high'
    }
  });

  if (result.thread == null) throw new Error('The response is missing thread.');
  console.log('Thread created:', result.thread.id);
});
```
