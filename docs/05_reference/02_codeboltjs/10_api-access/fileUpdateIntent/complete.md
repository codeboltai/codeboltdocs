---
name: complete
description: Complete an intent.
cbbaseinfo:
  description: Complete an intent.
data:
  name: complete
  category: fileUpdateIntent
  link: complete.md
---

# complete

```text
codebolt.fileUpdateIntent.complete(id: string, closedBy: string): Promise<FileUpdateIntent>
```

Complete an intent

## Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const completed = await codebolt.fileUpdateIntent.complete(
    'intent-id-123',
    'agent-456'
  );

  console.log('Intent completed:', completed.status === 'completed');
});
```
