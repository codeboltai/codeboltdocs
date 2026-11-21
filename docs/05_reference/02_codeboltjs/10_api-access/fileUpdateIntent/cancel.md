---
name: cancel
description: Cancel an intent.
cbbaseinfo:
  description: Cancel an intent.
data:
  name: cancel
  category: fileUpdateIntent
  link: cancel.md
---

# cancel

```text
codebolt.fileUpdateIntent.cancel(id: string, cancelledBy: string): Promise<FileUpdateIntent>
```

Cancel an intent

## Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const cancelled = await codebolt.fileUpdateIntent.cancel(
    'intent-id-123',
    'agent-456'
  );

  console.log('Intent cancelled:', cancelled.status === 'cancelled');
});
```
