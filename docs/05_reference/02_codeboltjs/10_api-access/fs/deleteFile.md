---
name: deleteFile
description: Deletes a file at the specified path.
cbbaseinfo:
  description: Deletes a file at the specified path.
data:
  name: deleteFile
  category: fs
  link: deleteFile.md
---

# deleteFile

```text
codebolt.fs.deleteFile(filename: string, filePath: string): Promise<DeleteFileResponse>
```

Deletes a file at the specified path. This function allows you to remove files from the filesystem permanently.

## Parameters

- `filename` — The name of the file to delete.
- `filePath` — The path of the file to delete.

## When to use it

Remove a temporary file or build artifact after confirming its path.

## Examples

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 2: Delete a file from current directory
  const deleteResult = await codebolt.fs.deleteFile('temp-file.txt', '.');
  console.log("✅ File deleted:", deleteResult.success);
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 3: Delete multiple files
  const filesToDelete = [
      { name: 'temp1.txt', path: './temp' },
      { name: 'temp2.txt', path: './temp' },
      { name: 'old-config.json', path: '.' }
  ];

  for (const file of filesToDelete) {
      const result = await codebolt.fs.deleteFile(file.name, file.path);
      console.log(`${file.name}: ${result.success ? 'deleted' : 'failed'}`);
  }
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 4: Error handling
  try {
      const fileResult = await codebolt.fs.deleteFile('non-existent-file.txt', '.');

      if (fileResult.success) {
          console.log('✅ File deleted successfully');
          console.log('File path:', fileResult.path);
          console.log('Message:', fileResult.message);
      } else {
          console.error('❌ File deletion failed:', fileResult.error);
      }
  } catch (error) {
      console.error('Error deleting file:', error);
  }
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 5: Cleanup workflow
  const cleanupFiles = [
      'build-temp.log',
      'cache.tmp',
      'debug.log',
      'error.log'
  ];

  console.log("Starting cleanup...");
  for (const fileName of cleanupFiles) {
      const result = await codebolt.fs.deleteFile(fileName, './logs');
      if (result.success) {
          console.log(`✅ Cleaned up: ${fileName}`);
      } else {
          console.log(`⚠️  Could not delete: ${fileName} (${result.error})`);
      }
  }
  console.log("Cleanup complete");
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 6: Safe deletion with confirmation
  const fileToDelete = 'important-file.txt';
  const filePath = './backup';

  // First, check if file exists by trying to read it
  try {
      const fileContent = await codebolt.fs.readFile(`${filePath}/${fileToDelete}`);
      if (fileContent.success && fileContent.content) {
          console.log(`File exists with ${fileContent.content.length} characters`);

          // Proceed with deletion
          const deleteResult = await codebolt.fs.deleteFile(fileToDelete, filePath);
          if (deleteResult.success) {
              console.log('✅ File safely deleted');
          } else {
              console.error('❌ Failed to delete file:', deleteResult.error);
          }
      }
  } catch (error) {
      console.log('File does not exist or cannot be read');
  }
});
```
