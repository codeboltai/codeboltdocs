---
name: readFile
data:
  name: readFile
  category: fs
  link: readFile.md
---

# readFile

```text
codebolt.fs.readFile(filePath: string, options?: ReadFileOptions): Promise<ReadFileResponse>
```

Reads a file from the active workspace. `offset` is the starting line (line 1 by default, with 0 also selecting the first line). Set `limit` to cap the number of lines and `lineNumbers` to include line numbers in the returned text. `maxTokens` and `maxSizeBytes` control read limits.

Text is returned in `content`. For an image, inspect `mediaType` and `image`. The service can return `unchanged: true` on a repeated read. Set `bypassUnchanged: true` to request the content again.

## When to use it

Read a configuration or source file before making an edit. Use line ranges for large files, and request the content again when an unchanged response would not be useful.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.fs.readFile('README.md', { offset: 0, limit: 30 });
  if (result.success && typeof result.content === 'string') {
    console.log(result.content);
  }
});
```

## More examples

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 2: Read a configuration file
  const configResult = await codebolt.fs.readFile('./package.json');
  if (configResult.success && configResult.content) {
      const config = JSON.parse(configResult.content);
      console.log("Package name:", config.name);
      console.log("Version:", config.version);
  }
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 3: Read a source code file
  const codeResult = await codebolt.fs.readFile('./src/index.js');
  console.log("JavaScript code content:", codeResult.content);
  console.log("File size:", codeResult.content?.length, "characters");
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 4: Error handling
  try {
      const fileResult = await codebolt.fs.readFile('./non-existent-file.txt');

      if (fileResult.success && fileResult.content) {
          console.log('✅ File read successfully');
          console.log('Content length:', fileResult.content.length);
          console.log('File path:', fileResult.path);
      } else {
          console.error('❌ File read failed:', fileResult.error);
      }
  } catch (error) {
      console.error('Error reading file:', error);
  }
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 5: Read multiple files
  const filesToRead = [
      './README.md',
      './package.json',
      './src/index.js',
      './docs/api.md'
  ];

  for (const filePath of filesToRead) {
      const result = await codebolt.fs.readFile(filePath);
      if (result.success && result.content) {
          console.log(`${filePath}: ${result.content.length} characters`);
      } else {
          console.log(`${filePath}: failed to read`);
      }
  }
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 6: Process file content
  const markdownResult = await codebolt.fs.readFile('./README.md');
  if (markdownResult.content) {
      const lines = markdownResult.content.split('\n');
      const headings = lines.filter(line => line.startsWith('#'));
      console.log("Markdown headings found:", headings);
  }
});
```

## Read the first lines of a configuration file

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.fs.readFile('package.json', {
    offset: 1,
    limit: 20,
    lineNumbers: true,
    bypassUnchanged: true,
  });
  if (result.success && typeof result.content === 'string') console.log(result.content);
});
```
