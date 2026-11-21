---
name: createFile
data:
  name: createFile
  category: fs
  link: createFile.md
---

# createFile

```text
codebolt.fs.createFile(fileName: string, source: string, filePath: string): Promise<CreateFileResponse>
```

Joins `fileName` to the directory `filePath` and writes `source` to that file. Pass an empty file name when `filePath` already contains the full file path.

## When to use it

Create a document or source file when you know both its directory and its initial contents.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.fs.createFile('example.txt', 'Hello from Codebolt', '.');
  console.log(result.success);
});
```

## More examples

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 2: Create a JavaScript file with code content
  const jsCodeContent = `
class TestClass {
    constructor(name) {
        this.name = name;
    }

    testMethod() {
        return 'Hello from ' + this.name;
    }
}

function testFunction(param1, param2) {
    return param1 + param2;
}

module.exports = { TestClass, testFunction };
`;

  const jsResult = await codebolt.fs.createFile(
      'test-code.js',
      jsCodeContent,
      './src'
  );
  console.log("JavaScript file created:", jsResult.success);
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 3: Create a configuration file
  const configContent = JSON.stringify({
      name: "my-app",
      version: "1.0.0",
      description: "A sample application",
      scripts: {
          start: "node index.js",
          test: "jest"
      }
  }, null, 2);

  const configResult = await codebolt.fs.createFile(
      'package.json',
      configContent,
      '.'
  );
  console.log("Config file created:", configResult.path);
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 4: Error handling
  try {
      const fileResult = await codebolt.fs.createFile(
          'test-file.txt',
          'This is a test file created by CodeboltJS',
          './output'
      );

      if (fileResult.success) {
          console.log('✅ File created successfully');
          console.log('File path:', fileResult.path);
          console.log('Message:', fileResult.message);
      } else {
          console.error('❌ File creation failed:', fileResult.error);
      }
  } catch (error) {
      console.error('Error creating file:', error);
  }
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 5: Create multiple files
  const filesToCreate = [
      { name: 'index.html', content: '<!DOCTYPE html><html><head><title>My App</title></head><body><h1>Hello World</h1></body></html>', path: './public' },
      { name: 'style.css', content: 'body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }', path: './public' },
      { name: 'script.js', content: 'console.log("Hello from script!");', path: './public' }
  ];

  for (const file of filesToCreate) {
      const result = await codebolt.fs.createFile(file.name, file.content, file.path);
      console.log(`${file.name}: ${result.success ? 'created' : 'failed'}`);
  }
});
```
