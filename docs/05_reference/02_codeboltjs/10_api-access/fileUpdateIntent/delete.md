---
name: delete
description: Delete an intent.
cbbaseinfo:
  description: Delete an intent.
data:
  name: delete
  category: fileUpdateIntent
  link: delete.md
---

# delete

```text
codebolt.fileUpdateIntent.delete(id: string): Promise<{ success: boolean; }>
```

Delete an intent

## Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.fileUpdateIntent.delete('intent-id-123');

  if (result.success) {
    console.log('Intent deleted');
  }
});
```
