---
name: getBlockedFiles
description: Get blocked files (level 4 locks).
cbbaseinfo:
  description: Get blocked files (level 4 locks).
data:
  name: getBlockedFiles
  category: fileUpdateIntent
  link: getBlockedFiles.md
---

# getBlockedFiles

```text
codebolt.fileUpdateIntent.getBlockedFiles(environmentId: string): Promise<{ blockedFiles: string[]; }>
```

Get blocked files (level 4 locks)

## When to use it

Inspect paths reported as blocked so you can decide where to avoid conflicting work.

## Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.fileUpdateIntent.getBlockedFiles('env-123');

  console.log('Blocked files:', result.blockedFiles);
});
```
