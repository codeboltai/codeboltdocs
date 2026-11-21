---
name: init
description: Initializes a new Git repository at the given path.
cbbaseinfo:
  description: Initializes a new Git repository at the given path.
data:
  name: init
  category: git
  link: init.md
---

# init

```text
codebolt.git.init(path: string): Promise<GitInitResponse>
```

Initializes a new Git repository at the given path.

## Parameters

- `path` — The file system path where the Git repository should be initialized.

## Returns

A promise that resolves with the response from the init event.

## When to use it

Initialize version control in a directory that needs its own repository.

## Examples

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 2: Initialize repository in current directory
  const currentDirInit = await codebolt.git.init('.');
  console.log("✅ Git init result:", currentDirInit.success);
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 3: Initialize repository for a new project
  const projectPath = './my-new-project';
  const projectInit = await codebolt.git.init(projectPath);
  if (projectInit.success) {
      console.log(`✅ Git repository initialized at: ${projectPath}`);
      console.log("Initialization message:", projectInit.message);
  } else {
      console.error("❌ Failed to initialize repository:", projectInit.error);
  }
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 4: Complete Git setup workflow
  try {
      // 1. Initialize repository
      const initResult = await codebolt.git.init('./my-project');

      if (initResult.success) {
          console.log('✅ Repository initialized:', initResult.message);

          // 2. Check initial status
          const statusResult = await codebolt.git.status();
          console.log('Initial status:', statusResult.data);

          // 3. Create initial file
          await codebolt.fs.createFile('README.md', '# My Project\n\nInitial project setup.', './my-project');

          // 4. Check status after file creation
          const statusAfterFile = await codebolt.git.status();
          console.log('Files to track:', statusAfterFile.data?.not_added);

          console.log('🎉 Git repository setup complete!');
      } else {
          console.error('❌ Repository initialization failed:', initResult.error);
      }
  } catch (error) {
      console.error('Error in Git setup workflow:', error);
  }
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 5: Initialize multiple repositories
  const repositories = [
      './frontend-app',
      './backend-api',
      './mobile-app'
  ];

  for (const repoPath of repositories) {
      const result = await codebolt.git.init(repoPath);
      console.log(`${repoPath}: ${result.success ? 'initialized' : 'failed'}`);
      if (result.message) {
          console.log(`  Message: ${result.message}`);
      }
  }
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 6: Error handling
  try {
      const invalidPathInit = await codebolt.git.init('/invalid/readonly/path');

      if (invalidPathInit.success) {
          console.log('✅ Repository initialized successfully');
      } else {
          console.error('❌ Initialization failed:', invalidPathInit.error);
          console.error('Message:', invalidPathInit.message);
      }
  } catch (error) {
      console.error('Error initializing repository:', error);
  }
});
```
