---
name: listFile
description: Lists paths under a folder.
cbbaseinfo:
  description: Lists paths under a folder.
data:
  name: listFile
  category: fs
  link: listFile.md
---

# listFile

```text
codebolt.fs.listFile(folderPath: string, isRecursive?: boolean): Promise<FileListResponse>
```

Lists paths under a folder. Pass `true` as the second argument to list recursively. On success, read the returned array in `files`.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.fs.listFile('.', true);
  if (result.success) console.log(result.files);
});
```

## More examples

### Basic Directory Listing

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // List files in a specific directory (non-recursive)
  const files = await codebolt.fs.listFile('/home/user/documents', false);
  console.log('Files in directory:', files);
});
```

### Current Directory Listing

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // List files in current directory
  const listResult = await codebolt.fs.listFile('.', false);
  console.log('✅ Directory listing (listFile):', listResult);
});
```
