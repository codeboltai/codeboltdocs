---
name: updateFile
description: Updates the content of a file at the specified path.
cbbaseinfo:
  description: Updates the content of a file at the specified path.
data:
  name: updateFile
  category: fs
  link: updateFile.md
---

# updateFile

```text
codebolt.fs.updateFile(filename: string, filePath: string, newContent: string): Promise<UpdateFileResponse>
```

Updates the content of a file at the specified path. This function allows you to modify existing files with new content.

## Parameters

- `filename` — The name of the file to update.
- `filePath` — The path of the file to update.
- `newContent` — The new content to write into the file.

## When to use it

Replace the contents of an existing file when you know its name and directory. Use a targeted edit when only one region needs to change.

## Examples

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 2: Update a configuration file
  const configContent = JSON.stringify({
      name: "my-app",
      version: "2.0.0",
      description: "Updated application configuration",
      main: "index.js"
  }, null, 2);

  const configResult = await codebolt.fs.updateFile(
      'package.json',
      '.',
      configContent
  );
  console.log("Config updated:", configResult.success);
  console.log("Bytes written:", configResult.bytesWritten);
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 3: Update source code file
  const codeContent = `
// Updated JavaScript code
class UpdatedClass {
    constructor(name) {
        this.name = name;
        this.version = "2.0";
    }

    getInfo() {
        return \`\${this.name} v\${this.version}\`;
    }
}

module.exports = UpdatedClass;
`;

  const codeResult = await codebolt.fs.updateFile(
      'MyClass.js',
      './src',
      codeContent
  );
  console.log("Code file updated:", codeResult.path);
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 4: Complete file workflow
  try {
      // 1. Create a file
      await codebolt.fs.createFile(
          'workflow-test.txt',
          'Original content',
          '.'
      );

      // 2. Read the original content
      const originalContent = await codebolt.fs.readFile('./workflow-test.txt');
      console.log('Original content:', originalContent.content);

      // 3. Update the file
      const updateResult = await codebolt.fs.updateFile(
          'workflow-test.txt',
          '.',
          'Updated content - file has been modified'
      );

      if (updateResult.success) {
          console.log('✅ File updated successfully');
          console.log('Bytes written:', updateResult.bytesWritten);

          // 4. Read the updated content
          const updatedContent = await codebolt.fs.readFile('./workflow-test.txt');
          console.log('Updated content:', updatedContent.content);
      }
  } catch (error) {
      console.error('Error in file workflow:', error);
  }
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 5: Update multiple files
  const filesToUpdate = [
      { name: 'version.txt', path: '.', content: 'v2.0.0' },
      { name: 'status.txt', path: '.', content: 'Updated' },
      { name: 'info.txt', path: '.', content: 'File updated on ' + new Date().toISOString() }
  ];

  for (const file of filesToUpdate) {
      const result = await codebolt.fs.updateFile(file.name, file.path, file.content);
      console.log(`${file.name}: ${result.success ? 'updated' : 'failed'} (${result.bytesWritten} bytes)`);
  }
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 6: Error handling
  try {
      const fileResult = await codebolt.fs.updateFile(
          'non-existent-file.txt',
          '.',
          'This will fail'
      );

      if (fileResult.success) {
          console.log('✅ File updated successfully');
          console.log('File path:', fileResult.path);
          console.log('Bytes written:', fileResult.bytesWritten);
      } else {
          console.error('❌ File update failed:', fileResult.error);
      }
  } catch (error) {
      console.error('Error updating file:', error);
  }
});
```
