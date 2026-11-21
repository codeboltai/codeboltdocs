---
name: listThreads
description: Lists all mail threads with optional filtering and pagination.
cbbaseinfo:
  description: Lists all mail threads with optional filtering and pagination.
data:
  name: listThreads
  category: mail
  link: listThreads.md
---

# listThreads

```text
codebolt.mail.listThreads(params?: IListThreadsParams): Promise<IListThreadsResponse>
```

Lists all mail threads with optional filtering and pagination.

## When to use it

Find relevant mail conversations for an inbox or handoff view.

## Examples

### List All Threads

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.mail.listThreads();

  console.log(`Total threads: ${result.total}`);
  if (result.threads == null) throw new Error('The response is missing threads.');
  result.threads.forEach(thread => {
    console.log(`- ${thread.subject} (${thread.status})`);
  });
});
```

### Filter by Status and Type

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.mail.listThreads({
    type: 'agent-to-agent',
    status: 'open',
    limit: 20
  });

  console.log('Open agent-to-agent threads:');
  if (result.threads == null) throw new Error('The response is missing threads.');
  result.threads.forEach(thread => {
    console.log(`- ${thread.subject}`);
  });
});
```
