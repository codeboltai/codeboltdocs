---
cbapicategory:
  - name: eventEmitter
    link: /docs/api/apiaccess/terminal/eventEmitter
    description: "EventEmitter for terminal events and real-time output handling."
  - name: executeCommand
    link: /docs/api/apiaccess/terminal/executeCommand
    description: Executes a command with automatic yield behavior. Short commands return completion output; long-running commands can return a background process id instead of blocking.
  - name: listCommands
    link: /docs/api/apiaccess/terminal/executeCommand#background-command-management
    description: Lists active background commands started by terminal execution.
  - name: readCommandOutput
    link: /docs/api/apiaccess/terminal/executeCommand#background-command-management
    description: Reads recent output from a background command by process id.
  - name: stopCommand
    link: /docs/api/apiaccess/terminal/executeCommand#background-command-management
    description: Stops a background command by process id.
  - name: executeCommandRunUntilError
    link: /docs/api/apiaccess/terminal/executeCommandRunUntilError
    description: Legacy compatibility API. Prefer executeCommand with background mode plus listCommands, readCommandOutput, and stopCommand for long-running processes.
  - name: executeCommandWithStream
    link: /docs/api/apiaccess/terminal/executeCommandWithStream
    description: "Streams incremental terminal events via EventEmitter. Use only when the caller needs live output events; otherwise prefer executeCommand."
  - name: sendManualInterrupt
    link: /docs/api/apiaccess/terminal/sendManualInterrupt
    description: "Sends a manual interrupt signal (Ctrl+C) to stop a running command or process in the terminal."
  - name: tui
    link: /docs/api/apiaccess/terminal/tui
    description: Runs, attaches to, reads, and controls terminal UI sessions through a headless xterm mirror. Supports visible Terminal panels, background PTYs, existing terminal attachment, screen snapshots, waits, typing, key presses, mouse wheel input, and cleanup.

---
# terminal

The `terminal` module provides comprehensive command-line interface capabilities for CodeboltJS. It enables execution of shell commands, real-time output streaming, and process management for development automation tasks.

<CBAPICategory />

## Key Features

### Command Execution
- **Default Execution**: Run shell commands with `executeCommand()`
- **Automatic Yielding**: Short commands return their final output; long-running commands can yield as `commandRunning`
- **Background Control**: List, read output from, and stop background commands with `listCommands()`, `readCommandOutput()`, and `stopCommand()`
- **Stream Execution**: Monitor incremental output with `executeCommandWithStream()` only when live events are required
- **Legacy Compatibility**: `executeCommandRunUntilError()` and `executeCommandRunUntilInterrupt()` remain for older callers
- **Process Control**: Interrupt the active foreground command with `sendManualInterrupt()`
- **TUI Control**: Drive interactive terminal applications with `terminal.tui.*`

### Output Handling
- **Standard Output**: Capture command stdout for processing
- **Error Output**: Handle stderr for error diagnostics
- **Exit Codes**: Check command execution status
- **Real-Time Streaming**: Monitor output as it's generated

## Quick Start Guide

### Basic Command Execution

```js
import codebolt from '@codebolt/codeboltjs';

// Execute a simple command
const result = await codebolt.terminal.executeCommand('echo "Hello, World!"');
console.log('✅ Command output:', result.stdout);

// Check Node.js version
const nodeVersion = await codebolt.terminal.executeCommand('node --version');
console.log('Node version:', nodeVersion.stdout);

// List directory contents
const dirListing = await codebolt.terminal.executeCommand('ls -la');
console.log('Directory contents:', dirListing.stdout);
```

### Command with Error Handling

```js
// Execute command with proper error handling
try {
    const result = await codebolt.terminal.executeCommand('npm install');

    if (result.type === 'commandFinish') {
        console.log('✅ Installation successful');
        console.log('Exit code:', result.exitCode);
    } else if (result.type === 'commandError') {
        console.error('❌ Installation failed:', result.error);
        console.error('Error details:', result.stderr);
    }
} catch (error) {
    console.error('❌ Command execution error:', error.message);
}
```

### Long-Running Commands

```js
const result = await codebolt.terminal.executeCommand('npm run dev', {
    executionMode: 'auto',
    yieldMs: 3000
});

if (result.type === 'commandRunning') {
    console.log('Server is running in the background:', result.processId);

    const output = await codebolt.terminal.readCommandOutput(result.processId, { lines: 100 });
    console.log(output.output);

    // Later, when the server is no longer needed:
    await codebolt.terminal.stopCommand(result.processId);
}
```

Use `executionMode: 'background'` when the caller already knows the command is a persistent process:

```js
const server = await codebolt.terminal.executeCommand('npm run dev', {
    executionMode: 'background'
});
```

Use `executeCommandWithStream()` only when your caller needs incremental output events rather than a completion or background-process response.

## Common Workflows

### Package Management Workflow
```js
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
```

### Git Operations Workflow
```js
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
```

### Build Process Workflow
```js
// Run build and wait for completion unless it exceeds the yield window
const buildResult = await codebolt.terminal.executeCommand('npm run build', {
    executionMode: 'auto',
    yieldMs: 3000
});

if (buildResult.type === 'commandFinish') {
    console.log('✅ Build successful');
} else if (buildResult.type === 'commandRunning') {
    console.log('Build is still running:', buildResult.processId);
    const latest = await codebolt.terminal.readCommandOutput(buildResult.processId, { lines: 100 });
    console.log(latest.output);
} else {
    console.error('❌ Build failed:', buildResult.error);
}
```

### Testing Workflow
```js
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
```

## Module Integration Examples

### Integration with File System Module
```js
// Create directory structure via terminal
await codebolt.terminal.executeCommand('mkdir -p src/components src/utils');

// Verify creation
const files = await codebolt.fs.listFile('./src');
console.log('Created directories:', files);

// Create file and verify
await codebolt.fs.createFile('index.js', 'console.log("Hello");', './src');
const checkFile = await codebolt.terminal.executeCommand('test -f src/index.js && echo "File exists"');
console.log(checkFile.stdout);
```

### Integration with Git Module
```js
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
```

### Integration with Browser Module
```js
// Start development server as a background command
const server = await codebolt.terminal.executeCommand('npm start', {
    executionMode: 'background'
});

if (server.type === 'commandRunning') {
    const output = await codebolt.terminal.readCommandOutput(server.processId, { lines: 100 });
    console.log(output.output);

    await codebolt.browser.newPage();
    await codebolt.browser.goToPage('http://localhost:3000');

    // Stop it when the browser workflow is finished.
    await codebolt.terminal.stopCommand(server.processId);
}
```

## Advanced Usage Patterns

### Command Chaining
```js
// Chain multiple commands
async function chainCommands(commands) {
    const results = [];

    for (const cmd of commands) {
        console.log(`🔄 Executing: ${cmd}`);
        const result = await codebolt.terminal.executeCommand(cmd);

        if (result.type === 'commandFinish') {
            console.log('✅ Success');
            results.push({ command: cmd, success: true, result });
        } else {
            console.error('❌ Failed:', result.error);
            results.push({ command: cmd, success: false, error: result.error });
            break; // Stop on failure
        }
    }

    return results;
}

// Usage
const commands = [
    'mkdir -p build',
    'npm run build',
    'npm run test'
];

await chainCommands(commands);
```

### Parallel Command Execution
```js
// Execute multiple commands in parallel
async function executeParallel(commands) {
    const promises = commands.map(async (cmd) => {
        try {
            const result = await codebolt.terminal.executeCommand(cmd);
            return {
                command: cmd,
                success: result.type === 'commandFinish',
                result
            };
        } catch (error) {
            return {
                command: cmd,
                success: false,
                error: error.message
            };
        }
    });

    const results = await Promise.all(promises);

    console.log('📊 Parallel execution results:');
    results.forEach(({ command, success }) => {
        console.log(`   ${success ? '✅' : '❌'} ${command}`);
    });

    return results;
}

// Usage
await executeParallel([
    'npm run lint',
    'npm run type-check',
    'npm run test'
]);
```

### Conditional Command Execution
```js
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

### Timeout-Based Command Execution
```js
// Execute command with timeout
async function executeWithTimeout(command, timeoutMs = 30000) {
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error(`Command timeout after ${timeoutMs}ms`)), timeoutMs);
    });

    try {
        const result = await Promise.race([
            codebolt.terminal.executeCommand(command),
            timeoutPromise
        ]);

        console.log('✅ Command completed');
        return result;
    } catch (error) {
        console.error('⏰ Command timed out or failed:', error.message);

        // Send interrupt to stop the command
        await codebolt.terminal.sendManualInterrupt();

        throw error;
    }
}

// Usage
await executeWithTimeout('npm run build', 60000); // 60 second timeout
```

### Retry Logic for Commands
```js
// Execute command with retry logic
async function executeWithRetry(command, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        console.log(`🔄 Attempt ${attempt}/${maxRetries}: ${command}`);

        try {
            const result = await codebolt.terminal.executeCommand(command);

            if (result.type === 'commandFinish') {
                console.log('✅ Command successful');
                return result;
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error(`❌ Attempt ${attempt} failed:`, error.message);

            if (attempt === maxRetries) {
                throw new Error(`Command failed after ${maxRetries} attempts`);
            }

            // Wait before retrying
            const waitTime = attempt * 2000; // Exponential backoff
            console.log(`⏳ Waiting ${waitTime}ms before retry...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }
    }
}

// Usage
await executeWithRetry('npm install', 5);
```

## Error Handling

### Comprehensive Error Handling
```js
async function safeCommandExecution(command) {
    try {
        const result = await codebolt.terminal.executeCommand(command);

        if (result.type === 'commandFinish') {
            if (result.exitCode === 0) {
                console.log('✅ Command executed successfully');
                return {
                    success: true,
                    stdout: result.stdout,
                    exitCode: result.exitCode
                };
            } else {
                console.warn('⚠️ Command completed with errors');
                return {
                    success: false,
                    stdout: result.stdout,
                    stderr: result.stderr,
                    exitCode: result.exitCode
                };
            }
        } else if (result.type === 'commandError') {
            console.error('❌ Command execution failed:', result.error);
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('❌ Unexpected error:', error.message);

        // Handle specific error types
        if (error.message.includes('ENOENT')) {
            console.error('💡 Command not found. Check if the command is installed.');
        } else if (error.message.includes('EACCES')) {
            console.error('💡 Permission denied. Try with sudo or check permissions.');
        }

        throw error;
    }
}

// Usage
await safeCommandExecution('npm run build');
```

## Performance Considerations

### Optimizing Command Execution
```js
// Batch commands to reduce overhead
async function batchCommands(commands) {
    const batchCommand = commands.join(' && ');
    console.log(`🔄 Executing batch: ${batchCommand}`);

    const result = await codebolt.terminal.executeCommand(batchCommand);

    if (result.exitCode === 0) {
        console.log('✅ All commands executed successfully');
    } else {
        console.error('❌ Batch execution failed');
    }

    return result;
}

// Usage
await batchCommands([
    'mkdir -p build',
    'npm run build',
    'npm run test'
]);
```

### Parallel vs Sequential Execution
```js
// Choose between parallel and sequential based on dependencies

// ❌ Bad: Sequential for independent commands
await codebolt.terminal.executeCommand('npm run lint');
await codebolt.terminal.executeCommand('npm run type-check');
await codebolt.terminal.executeCommand('npm run test');

// ✅ Good: Parallel for independent commands
await executeParallel([
    'npm run lint',
    'npm run type-check',
    'npm run test'
]);

// ✅ Good: Sequential for dependent commands
await batchCommands([
    'npm install',
    'npm run build',
    'npm run test'
]);
```

## Common Pitfalls and Solutions

### Pitfall 1: Not Checking Exit Codes
```js
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
```

### Pitfall 2: Ignoring Error Output
```js
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
```

### Pitfall 3: Not Handling Long-Running Commands
```js
// ❌ Bad: Force a persistent process to behave like a foreground command
await codebolt.terminal.executeCommand('npm run dev', { executionMode: 'foreground' });

// ✅ Good: Let Codebolt yield automatically, or declare it as background
const devServer = await codebolt.terminal.executeCommand('npm run dev', {
    executionMode: 'background'
});

if (devServer.type === 'commandRunning') {
    const output = await codebolt.terminal.readCommandOutput(devServer.processId, { lines: 100 });
    console.log(output.output);
}
```

### Pitfall 4: Not Cleaning Up Processes
```js
// ❌ Bad: Leaves background commands running
await codebolt.terminal.executeCommand('npm start', { executionMode: 'background' });

// ✅ Good: keep the process id and stop it when done
const server = await codebolt.terminal.executeCommand('npm start', {
    executionMode: 'background'
});

if (server.type === 'commandRunning') {
    await codebolt.terminal.stopCommand(server.processId);
}
```

## Best Practices

### 1. Always Check Exit Codes
```js
const result = await codebolt.terminal.executeCommand('npm test');
if (result.exitCode === 0) {
    console.log('✅ Tests passed');
} else {
    console.error('❌ Tests failed');
}
```

### 2. Use Background Mode for Persistent Commands
```js
const server = await codebolt.terminal.executeCommand('npm run dev', {
    executionMode: 'background'
});

if (server.type === 'commandRunning') {
    console.log('Process ID:', server.processId);
}
```

Use `executeCommandWithStream()` only when you need live output events in the current caller.

```js
const emitter = codebolt.terminal.executeCommandWithStream('npm run build');
emitter.on('commandOutput', (data) => console.log(data.output));
```

### 3. Implement Proper Error Handling
```js
try {
    const result = await codebolt.terminal.executeCommand('npm install');

    if (result.type === 'commandError') {
        throw new Error(result.error);
    }

    if (result.exitCode !== 0) {
        throw new Error(`Command failed with exit code ${result.exitCode}`);
    }
} catch (error) {
    console.error('Command failed:', error.message);
    throw error;
}
```

### 4. Clean Up Resources
```js
const emitter = codebolt.terminal.executeCommandWithStream('npm start');

try {
    // Do work...
} finally {
    await codebolt.terminal.sendManualInterrupt();
    if (emitter.cleanup) {
        emitter.cleanup();
    }
}
```

### 5. Use Appropriate Command Type
```js
// Use executeCommand for normal commands
await codebolt.terminal.executeCommand('ls -la');

// Use auto mode for commands that might be short or long
await codebolt.terminal.executeCommand('npm test', { executionMode: 'auto' });

// Use background mode when you already know it is persistent
const watch = await codebolt.terminal.executeCommand('npm run watch', {
    executionMode: 'background'
});

// Use streaming only when incremental events are required
const emitter = codebolt.terminal.executeCommandWithStream('npm run build');
```

`executeCommandRunUntilError()` and `executeCommandRunUntilInterrupt()` are compatibility APIs. Prefer `executeCommand()` plus `listCommands()`, `readCommandOutput()`, and `stopCommand()` for new agent-facing command flows.

## Troubleshooting

### Common Issues and Solutions

**Issue**: Command not found
- **Solution**: Verify the command is installed and in PATH

**Issue**: Permission denied
- **Solution**: Check file permissions or use appropriate sudo privileges

**Issue**: Command hangs indefinitely
- **Solution**: Use `executionMode: 'auto'` or `executionMode: 'background'`, then manage the process with `listCommands()`, `readCommandOutput()`, and `stopCommand()`

**Issue**: Output not captured
- **Solution**: Check if command outputs to stderr instead of stdout

**Issue**: Exit code always 0
- **Solution**: Some commands don't set proper exit codes; check output for errors
