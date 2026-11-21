---
name: search
description: Searches for messages matching specific criteria.
cbbaseinfo:
  description: Searches for messages matching specific criteria.
data:
  name: search
  category: mail
  link: search.md
---

# search

```text
codebolt.mail.search(params: ISearchParams): Promise<ISearchResponse>
```

Searches for messages matching specific criteria.

## When to use it

Find earlier discussions by searching the mail contents.

## Example

### Search Messages

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.mail.search({
    query: 'authentication bug',
    threadId: 'thread-123',
    limit: 20
  });

  if (result.messages == null) throw new Error('The response is missing messages.');
  console.log(`Found ${result.messages.length} matching messages`);
  result.messages.forEach(msg => {
    console.log(`- ${msg.content}`);
  });
});
```
