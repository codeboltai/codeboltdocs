---
name: searchFiles
data:
  name: searchFiles
  category: fs
  link: searchFiles.md
---

# searchFiles

```text
codebolt.fs.searchFiles(path: string, regex: string, filePattern: string): Promise<SearchFilesResponse>
```

Part of the [File System](../fs/index.md) API.

## Parameters

- `path` — The path to search within.
- `regex` — The regex pattern to search for.
- `filePattern` — The file pattern to match files.

## Returns

A promise that resolves with the search results.

## When to use it

Find matching text across a directory of source files. Supply a file pattern when you want to limit the results to one language or kind of file.

## Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // ❌ Bad: Search entire filesystem
  await codebolt.fs.searchFiles('/', 'test', '*.*');

  // ✅ Good: Search specific directory
  await codebolt.fs.searchFiles('./src', 'test', '*.js');
});
```

## More examples

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 1: Basic file search
  const result = await codebolt.fs.searchFiles('/home/user/documents', 'example', '*.txt');
  console.log('Search results:', result);
  console.log('Files found:', result.results?.length || 0);
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 2: Search in current directory
  const searchResult = await codebolt.fs.searchFiles('.', '.*\\.txt', '*.txt');
  console.log('✅ File search result:', searchResult);
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 4: Search for configuration files
  const configSearch = await codebolt.fs.searchFiles('.', 'config', '*.json');
  console.log('Configuration files:', configSearch);
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 5: Search for all text files
  const txtSearch = await codebolt.fs.searchFiles('.', '.*', '*.txt');
  console.log('All text files:', txtSearch);
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 7: Search for function declarations
  const functionSearch = await codebolt.fs.searchFiles(
      '.',
      'function\\s+\\w+\\s*\\(',
      '*.js'
  );
  console.log('Files with function declarations:', functionSearch);
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 8: Search for class definitions
  const classSearch = await codebolt.fs.searchFiles(
      '.',
      'class\\s+\\w+',
      '*.js'
  );
  console.log('Files with class definitions:', classSearch);
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 10: Search for import statements
  const importSearch = await codebolt.fs.searchFiles(
      '.',
      'import\\s+.*\\s+from\\s+[\'"].*[\'"]',
      '*.{js,ts,jsx,tsx}'
  );
  console.log('Files with imports:', importSearch);
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 11: Search for console.log statements
  const consoleSearch = await codebolt.fs.searchFiles(
      './src',
      'console\\.(log|warn|error|debug)',
      '*.js'
  );
  console.log('Files with console statements:', consoleSearch);
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 12: Search for API endpoints
  const endpointSearch = await codebolt.fs.searchFiles(
      './src',
      '(app\\.(get|post|put|delete|patch)|router\\.(get|post|put|delete|patch))',
      '*.{js,ts}'
  );
  console.log('Files with API endpoints:', endpointSearch);
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 13: Search for SQL queries
  const sqlSearch = await codebolt.fs.searchFiles(
      './src',
      '(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER)\\s+',
      '*.{js,ts,sql}'
  );
  console.log('Files with SQL queries:', sqlSearch);
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 14: Search for environment variable usage
  const envSearch = await codebolt.fs.searchFiles(
      './src',
      'process\\.env\\.[A-Z_]+',
      '*.{js,ts}'
  );
  console.log('Files using environment variables:', envSearch);
});
```

### Case-Insensitive Search

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Search for pattern regardless of case
  const caseInsensitiveResult = await codebolt.fs.searchFiles(
      './src',
      '(?i)error', // Case-insensitive flag
      '*.js'
  );
});
```

### Multiple File Extensions

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Search in multiple file types
  const multiExtResult = await codebolt.fs.searchFiles(
      './src',
      'interface\\s+\\w+',
      '*.{ts,tsx,js,jsx}'
  );
});
```

### Complex Regex Patterns

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Search for React components
  const componentSearch = await codebolt.fs.searchFiles(
      './src',
      '(?:class\\s+\\w+\\s+extends\\s+(?:React\\.)?Component|const\\s+\\w+\\s*=\\s*(?:\\([^)]*\\))?\\s*=>)',
      '*.{jsx,tsx}'
  );

  // Search for async/await patterns
  const asyncSearch = await codebolt.fs.searchFiles(
      './src',
      '(?:async\\s+function\\s+\\w+|const\\s+\\w+\\s*=\\s*async\\s*\\()',
      '*.js'
  );
});
```

### Performance Considerations

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // ❌ Slow: Broad search
  const slow = await codebolt.fs.searchFiles('/', '.*', '*.*');

  // ✅ Fast: Targeted search
  const fast = await codebolt.fs.searchFiles('./src', 'specificPattern', '*.js');
});
```

### Common Pitfalls and Solutions

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // ❌ Bad: Unclosed parenthesis
  await codebolt.fs.searchFiles('.', '(function', '*.js');

  // ✅ Good: Properly escaped regex
  await codebolt.fs.searchFiles('.', '\\(function', '*.js');
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // ❌ Bad: Unescaped dot matches any character
  await codebolt.fs.searchFiles('.', 'test.js', '*.*');

  // ✅ Good: Escaped dot for literal match
  await codebolt.fs.searchFiles('.', 'test\\.js', '*.*');
});
```
