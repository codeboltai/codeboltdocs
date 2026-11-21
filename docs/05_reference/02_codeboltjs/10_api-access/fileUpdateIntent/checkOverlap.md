---
name: checkOverlap
description: Check for overlap without creating.
cbbaseinfo:
  description: Check for overlap without creating.
data:
  name: checkOverlap
  category: fileUpdateIntent
  link: checkOverlap.md
---

# checkOverlap

```text
codebolt.fileUpdateIntent.checkOverlap(environmentId: string, filePaths: string[], priority?: number): Promise<IntentOverlapResult>
```

Check for overlap without creating

## When to use it

Check a proposed set of paths against existing intents before accepting an edit task.

## Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const overlap = await codebolt.fileUpdateIntent.checkOverlap(
    'env-123',
    [
      '/src/auth/login.tsx',
      '/src/auth/api.ts',
      '/src/styles/auth.css'
    ],
    7
  );

  if (overlap.blockedFiles.length > 0) {
    console.log('Blocked files:', overlap.blockedFiles);
  }
});
```

## More examples

### Check Before Creating Intent

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const overlap = await codebolt.fileUpdateIntent.checkOverlap(
    'env-123',
    ['/src/components/Button.tsx'],
    5
  );

  if (overlap.hasOverlap) {
    console.log('Overlap detected:', overlap.message);

    if (!overlap.canProceed) {
      console.log('Cannot proceed due to conflicts');
      return;
    }
  }

  console.log('Safe to proceed');
});
```
