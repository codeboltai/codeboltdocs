---
name: executeCommand
description: Runs a command using the active Codebolt environment.
cbbaseinfo:
  description: Runs a command using the active Codebolt environment.
data:
  name: executeCommand
  category: terminal
  link: executeCommand.md
---

# executeCommand

```text
codebolt.terminal.executeCommand(command: string, options?: boolean | ExecuteCommandOptions): Promise<CommandOutput | CommandError | CommandFinish | any>
```

Runs a command using the active Codebolt environment. Pass a boolean to set the legacy `executeInMain` flag, or an options object for command execution settings. Use the terminal module’s process methods for a managed command ID.

## When to use it

Run a bounded command such as checking a tool version or executing a test. Inspect the command response before reporting success.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.terminal.executeCommand('pwd');
  console.log(result);
});
```

## More examples

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 1: Basic command execution
  const nodeVersionResult = await codebolt.terminal.executeCommand('node --version');
  console.log('✅ Node version:', nodeVersionResult);
  console.log('Exit code:', nodeVersionResult.exitCode);
  console.log('Output:', nodeVersionResult.stdout);
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 2: Command with npm version check
  const npmVersionResult = await codebolt.terminal.executeCommand('npm --version');
  console.log('✅ NPM version:', npmVersionResult);
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 3: Command with returnEmptyStringOnSuccess option
  const emptyResult = await codebolt.terminal.executeCommand('echo "test"', {
      returnEmptyStringOnSuccess: true
  });
  console.log('✅ Empty result (success):', emptyResult);
  if (emptyResult.type === 'commandFinish') {
      console.log('Command completed successfully with exit code:', emptyResult.exitCode);
  }
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 5: File operations
  const executeFileOperations = async () => {
      // Create a directory
      const mkdirResult = await codebolt.terminal.executeCommand('mkdir test-folder');
      if (mkdirResult.type === 'commandFinish' && mkdirResult.exitCode === 0) {
          console.log('✅ Directory created successfully');

          // List directory contents
          const lsResult = await codebolt.terminal.executeCommand('ls -la');
          if (lsResult.type === 'commandFinish') {
              console.log('📁 Directory contents:');
              console.log(lsResult.stdout);
          }

          // Remove the directory
          const rmResult = await codebolt.terminal.executeCommand('rmdir test-folder');
          if (rmResult.type === 'commandFinish') {
              console.log('✅ Directory removed successfully');
          }
      }
  };
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 6: Package management operations
  const packageOperations = async () => {
      // Check if package.json exists
      const checkPackageJson = await codebolt.terminal.executeCommand('test -f package.json');

      if (checkPackageJson.type === 'commandFinish' && checkPackageJson.exitCode === 0) {
          console.log('📦 package.json found');

          // Install dependencies
          const installResult = await codebolt.terminal.executeCommand('npm install');
          if (installResult.type === 'commandFinish') {
              console.log('✅ Dependencies installed');
              console.log('Install output:', installResult.stdout);
          } else {
              console.error('❌ Failed to install dependencies:', installResult.error);
          }
      } else {
          console.log('⚠️ No package.json found');
      }
  };
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Example 9: Conditional command execution
  const conditionalExecution = async () => {
      // Check if Git is available
      const gitCheck = await codebolt.terminal.executeCommand('git --version');

      if (gitCheck.type === 'commandFinish') {
          console.log('✅ Git is available:', gitCheck.stdout?.trim());

          // Check if we're in a Git repository
          const gitRepoCheck = await codebolt.terminal.executeCommand('git rev-parse --is-inside-work-tree');

          if (gitRepoCheck.type === 'commandFinish') {
              console.log('📁 Inside Git repository');

              // Get Git status
              const gitStatus = await codebolt.terminal.executeCommand('git status --porcelain');
              if (gitStatus.type === 'commandFinish') {
                  if (gitStatus.stdout?.trim()) {
                      console.log('📝 Repository has changes');
                      console.log(gitStatus.stdout);
                  } else {
                      console.log('✨ Repository is clean');
                  }
              }
          } else {
              console.log('⚠️ Not in a Git repository');
          }
      } else {
          console.log('❌ Git is not available:', gitCheck.error);
      }
  };
});
```
