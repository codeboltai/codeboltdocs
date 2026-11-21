---
name: getFilesWithIntents
description: Get all files with intents.
cbbaseinfo:
  description: Get all files with intents.
data:
  name: getFilesWithIntents
  category: fileUpdateIntent
  link: getFilesWithIntents.md
---

# getFilesWithIntents

```text
codebolt.fileUpdateIntent.getFilesWithIntents(environmentId: string): Promise<FileWithIntent[]>
```

Get all files with intents

## When to use it

Find paths covered by existing intents when distributing edits across agents.

## Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const files = await codebolt.fileUpdateIntent.getFilesWithIntents('env-123');

  console.log(`Found ${files.length} files with active intents`);

  files.forEach(file => {
    console.log(`- ${file.filePath} (level ${file.intentLevel})`);
    console.log(`  Claimed by: ${file.claimedByName || file.claimedBy}`);
  });
});
```
