---
name: update
description: Update an existing intent.
cbbaseinfo:
  description: Update an existing intent.
data:
  name: update
  category: fileUpdateIntent
  link: update.md
---

# update

```text
codebolt.fileUpdateIntent.update(id: string, data: UpdateFileUpdateIntentRequest): Promise<FileUpdateIntent>
```

Update an existing intent

## Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const updated = await codebolt.fileUpdateIntent.update(
    'intent-id-123',
    { description: 'Updated: Additional features added' }
  );
});
```

## More examples

### Update Priority

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const updated = await codebolt.fileUpdateIntent.update(
    'intent-id-123',
    { priority: 9 }
  );

  console.log('New priority:', updated.priority);
});
```

### Add Files to Intent

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const current = await codebolt.fileUpdateIntent.get('intent-id-123');

  if (current == null) throw new Error('The response is missing current.');
  const updated = await codebolt.fileUpdateIntent.update(
    'intent-id-123',
    {
      files: [
        ...current.files,
        { filePath: '/src/utils/helpers.ts', intentLevel: 2 }
      ]
    }
  );
});
```
