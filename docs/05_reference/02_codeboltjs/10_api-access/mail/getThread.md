---
name: getThread
description: Retrieves detailed information about a specific mail thread.
cbbaseinfo:
  description: Retrieves detailed information about a specific mail thread.
data:
  name: getThread
  category: mail
  link: getThread.md
---

# getThread

```text
codebolt.mail.getThread(params: IGetThreadParams): Promise<IGetThreadResponse>
```

Retrieves detailed information about a specific mail thread.

## When to use it

Inspect a mail thread before choosing where to send an update.

## Example

### Get Thread Details

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.mail.getThread({
    threadId: 'thread-123'
  });

  if (result.success) {
    if (result.thread == null) throw new Error('The response is missing thread.');
    console.log('Subject:', result.thread.subject);
    console.log('Participants:', result.thread.participants);
    console.log('Status:', result.thread.status);
  }
});
```
