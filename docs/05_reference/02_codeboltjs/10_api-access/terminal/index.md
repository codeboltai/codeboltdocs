# Terminal

Run commands, stream output, or inspect and stop managed processes.

The command service provides one-shot requests, streamed events, and managed process queries. Each process query takes the numeric process ID.

## When to use it

Choose a one-shot command for a concise result, streaming for ongoing output, or a terminal session for interactive prompts.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.terminal.executeCommand('pwd');
  console.log(result);
});
```

## More examples

### Basic Command Execution

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Execute a simple command
  const result = await codebolt.terminal.executeCommand('echo "Hello, World!"');
  console.log('✅ Command output:', result.stdout);

  // Check Node.js version
  const nodeVersion = await codebolt.terminal.executeCommand('node --version');
  console.log('Node version:', nodeVersion.stdout);

  // List directory contents
  const dirListing = await codebolt.terminal.executeCommand('ls -la');
  console.log('Directory contents:', dirListing.stdout);
});
```

### Package Management Workflow

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Check package.json exists
  const checkResult = await codebolt.terminal.executeCommand('test -f package.json');

  if (checkResult.exitCode === 0) {
      console.log('📦 package.json found');

      // Install dependencies
      const installResult = await codebolt.terminal.executeCommand('npm install');

      if (installResult.type === 'commandFinish') {
          console.log('✅ Dependencies installed');
      }
  }
});
```

### Git Operations Workflow

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Check Git status
  const gitStatus = await codebolt.terminal.executeCommand('git status --porcelain');

  if (gitStatus.stdout.trim()) {
      console.log('📝 Repository has changes');

      // Stage and commit
      await codebolt.terminal.executeCommand('git add .');
      await codebolt.terminal.executeCommand('git commit -m "Update files"');
  } else {
      console.log('✨ Repository is clean');
  }
});
```

### Testing Workflow

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(() => {
  // Run tests with real-time output
  const testEmitter = codebolt.terminal.executeCommandWithStream('npm test');

  let testCount = 0;
  let passCount = 0;
  let failCount = 0;

  testEmitter.on('commandOutput', (data) => {
      const output = data.output;

      // Track test results
      if (output.includes('✓') || output.includes('pass')) {
          passCount++;
          console.log(`✅ Test passed: ${passCount}`);
      } else if (output.includes('✗') || output.includes('fail')) {
          failCount++;
          console.log(`❌ Test failed: ${failCount}`);
      }

      testCount++;
  });

  testEmitter.on('commandFinish', (finish) => {
      console.log(`\n📊 Test Summary:`);
      console.log(`   Total: ${testCount}`);
      console.log(`   ✅ Passed: ${passCount}`);
      console.log(`   ❌ Failed: ${failCount}`);
  });
});
```

### Integration with File System Module

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create directory structure via terminal
  await codebolt.terminal.executeCommand('mkdir -p src/components src/utils');

  // Verify creation
  const files = await codebolt.fs.listFile('./src');
  console.log('Created directories:', files);

  // Create file and verify
  await codebolt.fs.createFile('index.js', 'console.log("Hello");', './src');
  const checkFile = await codebolt.terminal.executeCommand('test -f src/index.js && echo "File exists"');
  console.log(checkFile.stdout);
});
```

### Integration with Git Module

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Initialize repository via terminal
  await codebolt.terminal.executeCommand('git init');

  // Create .gitignore file
  await codebolt.fs.createFile('.gitignore', 'node_modules/\n.env', '.');

  // Stage and commit
  await codebolt.git.addAll();
  await codebolt.git.commit('Initial commit');

  // Verify with git log
  const gitLog = await codebolt.terminal.executeCommand('git log --oneline');
  console.log('Git history:', gitLog.stdout);
});
```

### Conditional Command Execution

```js
import codebolt from '@codebolt/codeboltjs';

// Execute commands based on conditions
async function conditionalWorkflow() {
    // Check if Node.js is installed
    const nodeCheck = await codebolt.terminal.executeCommand('which node');

    if (nodeCheck.exitCode !== 0) {
        console.error('❌ Node.js not found. Please install Node.js first.');
        return;
    }

    console.log('✅ Node.js found');

    // Check if package.json exists
    const packageCheck = await codebolt.terminal.executeCommand('test -f package.json');

    if (packageCheck.exitCode === 0) {
        console.log('📦 package.json found, installing dependencies...');
        await codebolt.terminal.executeCommand('npm install');
    } else {
        console.log('⚠️ No package.json found, initializing project...');
        await codebolt.terminal.executeCommand('npm init -y');
    }
}
```

### Pitfall 1: Not Checking Exit Codes

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // ❌ Bad: Assumes command succeeded
  await codebolt.terminal.executeCommand('npm install');
  console.log('Dependencies installed');

  // ✅ Good: Check exit code
  const result = await codebolt.terminal.executeCommand('npm install');
  if (result.exitCode === 0) {
      console.log('✅ Dependencies installed');
  } else {
      console.error('❌ Installation failed');
  }
});
```

### Pitfall 2: Ignoring Error Output

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // ❌ Bad: Only checks stdout
  const result = await codebolt.terminal.executeCommand('npm run build');
  console.log(result.stdout);

  // ✅ Good: Check both stdout and stderr
  if (result.stderr) {
      console.error('Build errors:', result.stderr);
  }
  if (result.exitCode !== 0) {
      console.error('Build failed with exit code:', result.exitCode);
  }
});
```

### Always Check Exit Codes

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.terminal.executeCommand('npm test');
  if (result.exitCode === 0) {
      console.log('✅ Tests passed');
  } else {
      console.error('❌ Tests failed');
  }
});
```

### Use Background Mode for Persistent Commands

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(() => {
  const emitter = codebolt.terminal.executeCommandWithStream('npm run build');
  emitter.on('commandOutput', (data) => console.log(data.output));
});
```

### Clean Up Resources

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const emitter = codebolt.terminal.executeCommandWithStream('npm start');

  try {
      // Do work...
  } finally {
      await codebolt.terminal.sendManualInterrupt();
      if (emitter.cleanup) {
          emitter.cleanup();
      }
  }
});
```

For sessions that display prompts or accept input, see [Interactive terminal sessions](./tui.md).

## SDK methods

### executeCommand

[`executeCommand`](executeCommand.md) · Executes a given command and returns the result.

### listCommands

```text
codebolt.terminal.listCommands(): Promise<any>
```

### stopCommand

```text
codebolt.terminal.stopCommand(processId: number): Promise<any>
```

### readCommandOutput

```text
codebolt.terminal.readCommandOutput(processId: number, params?: { lines?: number; tailBytes?: number; }): Promise<any>
```

### getCommandStatus

```text
codebolt.terminal.getCommandStatus(processId: number): Promise<any>
```

### waitCommand

```text
codebolt.terminal.waitCommand(processId: number, params?: { timeoutMs?: number; }): Promise<any>
```

### executeCommandRunUntilError

[`executeCommandRunUntilError`](executeCommandRunUntilError.md) · Executes a given command and keeps running until an error occurs.

### executeCommandRunUntilInterrupt

Executes a given command and keeps running until manually interrupted.

```text
codebolt.terminal.executeCommandRunUntilInterrupt(command: string, executeInMain?: boolean): Promise<CommandError>
```

### sendManualInterrupt

[`sendManualInterrupt`](sendManualInterrupt.md) · Sends a manual interrupt signal to the terminal.

### executeCommandWithStream

[`executeCommandWithStream`](executeCommandWithStream.md) · Executes a given command and streams the output.
