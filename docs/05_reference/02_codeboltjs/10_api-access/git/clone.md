---
name: clone
description: Clones a remote Git repository to the specified path.
cbbaseinfo:
  description: Clones a remote Git repository to the specified path.
data:
  name: clone
  category: git
  link: clone.md
---

# clone

```text
codebolt.git.clone(url: string, path?: string): Promise<GitCloneResponse>
```

Clones a remote Git repository to the specified path.

## Parameters

- `url` — The URL of the remote repository to clone.
- `path` — The file system path where the repository should be cloned.

## Returns

A promise that resolves with the response from the clone event.

## When to use it

Create a working copy of a repository for development or review.

## Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Clone and run setup script
  await codebolt.git.clone('https://github.com/user/repo.git', './project');
  await codebolt.terminal.executeCommand('cd ./project && npm run setup');
});
```

## More examples

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 2: Clone to current directory
  const cloneResult = await codebolt.git.clone('https://github.com/user/repo.git', '.');
  if (cloneResult.success) {
      console.log('✅ Repository cloned to current directory');
      console.log('Files:', cloneResult.message);
  } else {
      console.error('❌ Clone failed:', cloneResult.error);
  }
});
```

### Clone Repository Authentication

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Clone with SSH key (if configured)
  await codebolt.git.clone('git@github.com:user/repo.git', './project');

  // Clone with HTTPS (may require credentials)
  await codebolt.git.clone('https://github.com/user/repo.git', './project');
});
```

### Performance Considerations

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // ❌ Slow: Clone entire history
  await codebolt.git.clone('https://github.com/user/large-repo.git', './project');

  // ✅ Fast: Shallow clone for latest code only
  await codebolt.terminal.executeCommand('git clone --depth 1 https://github.com/user/large-repo.git ./project');
});
```

### Common Pitfalls and Solutions

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // ❌ Bad: Fails on private repos
  await codebolt.git.clone('https://github.com/user/private-repo.git', './project');

  // ✅ Good: Use SSH or handle authentication
  await codebolt.git.clone('git@github.com:user/private-repo.git', './project');
});
```

### Integration Examples

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Clone and analyze structure
  await codebolt.git.clone('https://github.com/user/repo.git', './project');
  const files = await codebolt.fs.listFile('./project', true);
  console.log('Repository structure:', files);
});
```
