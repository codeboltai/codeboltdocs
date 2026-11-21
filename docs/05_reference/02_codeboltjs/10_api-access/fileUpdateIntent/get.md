---
name: get
description: Get a single intent.
cbbaseinfo:
  description: Get a single intent.
data:
  name: get
  category: fileUpdateIntent
  link: get.md
---

# get

```text
codebolt.fileUpdateIntent.get(id: string): Promise<FileUpdateIntent | undefined>
```

Get a single intent

## Example

### Get Intent Details

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const intent = await codebolt.fileUpdateIntent.get('intent-id-123');

  if (intent == null) throw new Error('The response is missing intent.');
  console.log('Intent:', intent.description);
  console.log('Status:', intent.status);
  console.log('Files:', intent.files);
  console.log('Claimed by:', intent.claimedByName || intent.claimedBy);
});
```
