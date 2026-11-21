---
name: createFolder
data:
  name: createFolder
  category: fs
  link: createFolder.md
---

# createFolder

```text
codebolt.fs.createFolder(folderName: string, folderPath: string): Promise<CreateFolderResponse>
```

Joins `folderName` to the parent directory `folderPath`. Pass an empty folder name when `folderPath` already contains the full path of the folder to create.

## When to use it

Prepare a directory for a generated file, report, or build output.

## Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a folder in a specific directory
  const result = await codebolt.fs.createFolder('exampleFolder', '/home/user/documents');
  console.log('Folder created:', result);
});
```

## More examples

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 2: Create a folder in current directory
  const folderResult = await codebolt.fs.createFolder('test-folder', '.');
  console.log("✅ Folder created:", folderResult.success);
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 3: Create project structure
  const projectResult = await codebolt.fs.createFolder('my-project', '.');
  if (projectResult.success) {
      const srcResult = await codebolt.fs.createFolder('src', './my-project');
      const docsResult = await codebolt.fs.createFolder('docs', './my-project');
      const testsResult = await codebolt.fs.createFolder('tests', './my-project');

      console.log("Project structure created:");
      console.log("- my-project/");
      console.log("  - src/");
      console.log("  - docs/");
      console.log("  - tests/");
  }
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 4: Create multiple folders
  const folders = [
      { name: 'assets', path: './public' },
      { name: 'components', path: './src' },
      { name: 'utils', path: './src' },
      { name: 'config', path: '.' }
  ];

  for (const folder of folders) {
      const result = await codebolt.fs.createFolder(folder.name, folder.path);
      console.log(`${folder.name}: ${result.success ? 'created' : 'failed'}`);
  }
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 5: Error handling
  try {
      const folderResult = await codebolt.fs.createFolder('new-folder', './output');

      if (folderResult.success) {
          console.log('✅ Folder created successfully');
          console.log('Folder path:', folderResult.path);
          console.log('Message:', folderResult.message);
      } else {
          console.error('❌ Folder creation failed:', folderResult.error);
      }
  } catch (error) {
      console.error('Error creating folder:', error);
  }
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 6: Create nested folder structure
  const nestedFolders = [
      { name: 'frontend', path: '.' },
      { name: 'src', path: './frontend' },
      { name: 'components', path: './frontend/src' },
      { name: 'pages', path: './frontend/src' },
      { name: 'styles', path: './frontend/src' }
  ];

  for (const folder of nestedFolders) {
      const result = await codebolt.fs.createFolder(folder.name, folder.path);
      if (result.success) {
          console.log(`✅ Created: ${result.path}`);
      }
  }
});
```

### Create Folder in Current Directory

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a folder in the current working directory
  const folderResult = await codebolt.fs.createFolder('test-folder', '.');
  console.log('✅ Folder created:', folderResult);
});
```

### Complete Workflow with File Operations

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a project structure
  await codebolt.fs.createFolder('my-project', '.');
  await codebolt.fs.createFolder('src', './my-project');

  // Create files in the folders
  await codebolt.fs.createFile('index.js', 'console.log("Hello World");', './my-project/src');

  // List the created structure
  const projectFiles = await codebolt.fs.listFile('./my-project', true);
  console.log('Project structure:', projectFiles);
});
```
