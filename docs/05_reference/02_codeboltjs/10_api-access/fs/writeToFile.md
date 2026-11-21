---
name: writeToFile
description: Writes content to a file at the specified path.
cbbaseinfo:
  description: Writes content to a file at the specified path.
data:
  name: writeToFile
  category: fs
  link: writeToFile.md
---

# writeToFile

```text
codebolt.fs.writeToFile(relPath: string, newContent: string): Promise<any>
```

Writes content to a file at the specified path. Creates the file if it doesn''t exist or overwrites if it does.

## Parameters

- `relPath` — The relative path of the file to write to.
- `newContent` — The new content to write into the file.

## Returns

A promise that resolves with the write operation result.

## Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Write content to a file (creates if doesn't exist, overwrites if exists)
  const result = await codebolt.fs.writeToFile(
      '/home/user/documents/example.txt',
      'This is the new content.'
  );
  console.log('Write result:', result);
});
```

## More examples

### Write to File in Current Directory

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Write content to a file in current directory
  const writeResult = await codebolt.fs.writeToFile(
      './fs-test-file.txt',
      'This is content written using writeToFile method'
  );
  console.log('✅ Write to file:', writeResult);
});
```
