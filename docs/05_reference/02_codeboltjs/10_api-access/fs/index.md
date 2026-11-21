# File System

Read, write, edit, list, and search files in the workspace.

Relative paths resolve against the workspace used by the active Codebolt session. Check `success` on the result before using response data. The read endpoint can return image data or an unchanged-file response when applicable.

## When to use it

Use targeted file reads and searches to gather context. Choose a whole-file write when you already have the complete content, or an edit operation when you need a focused change.

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

### Basic File Operations

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a new file
  await codebolt.fs.createFile('hello.txt', 'Hello, World!', '.');
  console.log('✅ File created');

  // Read file content
  const content = await codebolt.fs.readFile('./hello.txt');
  console.log('File content:', content.content);

  // Update file content
  await codebolt.fs.updateFile('hello.txt', '.', 'Hello, CodeboltJS!');
  console.log('✅ File updated');

  // Delete file
  await codebolt.fs.deleteFile('hello.txt', '.');
  console.log('✅ File deleted');
});
```

### Working with Folders

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a nested directory structure
  await codebolt.fs.createFolder('project', '.');
  await codebolt.fs.createFolder('src', './project');
  await codebolt.fs.createFolder('tests', './project');
  await codebolt.fs.createFolder('docs', './project');

  // List directory contents
  const files = await codebolt.fs.listFile('./project');
  console.log('Directory contents:', files);
});
```

### Searching and Analysis

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Search for specific content in files
  const searchResults = await codebolt.fs.searchFiles('.', 'function', '*.js');
  console.log('Files containing "function":', searchResults);

  // Extract code definitions
  const definitions = await codebolt.fs.listCodeDefinitionNames('./src');
  console.log('Code definitions:', definitions);
});
```

### Complete File Lifecycle

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create → Read → Update → Delete
  await codebolt.fs.createFile('example.txt', 'Initial content', '.');
  const content = await codebolt.fs.readFile('./example.txt');
  await codebolt.fs.updateFile('example.txt', '.', 'Updated content');
  await codebolt.fs.deleteFile('example.txt', '.');
});
```

### Project Structure Creation

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create organized project structure
  await codebolt.fs.createFolder('my-project', '.');
  await codebolt.fs.createFolder('src', './my-project');
  await codebolt.fs.createFolder('tests', './my-project');
  await codebolt.fs.createFile('index.js', 'console.log("Hello");', './my-project/src');
});
```

### Code Analysis Workflow

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create code file and extract definitions
  const jsCode = `
class MyClass {
    method() { return 'test'; }
}
function myFunction() { return 'hello'; }
`;
  await codebolt.fs.createFile('code.js', jsCode, '.');
  const definitions = await codebolt.fs.listCodeDefinitionNames('.');
});
```

### Batch File Processing

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Process multiple files efficiently
  const files = [
      { name: 'file1.txt', content: 'Content 1' },
      { name: 'file2.txt', content: 'Content 2' },
      { name: 'file3.txt', content: 'Content 3' }
  ];

  for (const file of files) {
      await codebolt.fs.createFile(file.name, file.content, './output');
      console.log(`✅ Created ${file.name}`);
  }

  // List all created files
  const outputFiles = await codebolt.fs.listFile('./output');
  console.log('Files created:', outputFiles);
});
```

### Integration with Git Module

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create files and commit to git
  await codebolt.fs.createFile('README.md', '# My Project\n\nDescription', '.');
  await codebolt.fs.createFile('.gitignore', 'node_modules/\n.env', '.');
  await codebolt.git.addAll();
  await codebolt.git.commit('Initial commit: Add README and gitignore');
});
```

### Integration with Terminal Module

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create script and execute it
  await codebolt.fs.createFile('script.sh', '#!/bin/bash\necho "Hello from script"', '.');
  await codebolt.terminal.executeCommand('chmod +x script.sh');
  await codebolt.terminal.executeCommand('./script.sh');
});
```

### Pitfall 4: Ignoring Path Separators

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // ❌ Bad: Hardcoded path separators
  await codebolt.fs.createFile('file.txt', 'content', 'src\\utils');

  // ✅ Good: Use forward slashes (cross-platform compatible)
  await codebolt.fs.createFile('file.txt', 'content', 'src/utils');
});
```

### Always Use Absolute or Consistent Relative Paths

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Define a base path for consistency
  const BASE_PATH = './my-project';

  await codebolt.fs.createFile('data.txt', 'content', BASE_PATH);
  await codebolt.fs.readFile(`${BASE_PATH}/data.txt`);
});
```

## SDK methods

### createFile

[`createFile`](createFile.md)

### createFolder

[`createFolder`](createFolder.md)

### readFile

[`readFile`](readFile.md)

### updateFile

[`updateFile`](updateFile.md)

### editFile

```text
codebolt.fs.editFile(params: { file_path?: string; path?: string; absolute_path?: string; old_string: string; new_string: string; replace_all?: boolean; }): Promise<EditFileResponse>
```

### deleteFile

[`deleteFile`](deleteFile.md)

### deleteFolder

[`deleteFolder`](deleteFolder.md)

### listFile

[`listFile`](listFile.md)

### listCodeDefinitionNames

[`listCodeDefinitionNames`](listCodeDefinitionNames.md)

### searchFiles

[`searchFiles`](searchFiles.md)

### writeToFile

[`writeToFile`](writeToFile.md)

### grepSearch

```text
codebolt.fs.grepSearch(path: string, query: string, includePattern?: string, excludePattern?: string, caseSensitive?: boolean): Promise<GrepSearchResponse>
```

### fileSearch

```text
codebolt.fs.fileSearch(query: string): Promise<FileSearchResponse>
```

### globSearch

```text
codebolt.fs.globSearch(pattern: string, searchPath?: string): Promise<GlobSearchResponse>
```

### editFileWithDiff

```text
codebolt.fs.editFileWithDiff(targetFile: string, codeEdit: string, diffIdentifier: string, prompt: string, applyModel?: string): Promise<EditFileAndApplyDiffResponse>
```

### readManyFiles

```text
codebolt.fs.readManyFiles(params: { paths: string[]; include?: string[]; exclude?: string[]; recursive?: boolean; use_default_excludes?: boolean; max_files?: number; max_total_size?: number; include_metadata?: boolean; separator_format?: string; notifyUser?: boolean; }): Promise<ReadManyFilesResponse>
```

### listDirectory

```text
codebolt.fs.listDirectory(params: { path: string; ignore?: string[]; show_hidden?: boolean; detailed?: boolean; limit?: number; notifyUser?: boolean; }): Promise<ListDirectoryResponse>
```
