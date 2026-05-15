---
cbapicategory:
  - name: eventEmitter
    link: /docs/api/apiaccess/terminal/eventEmitter
    description: "EventEmitter for terminal events and real-time output handling."
  - name: executeCommand
    link: /docs/api/apiaccess/terminal/executeCommand
    description: Executes a given command in the terminal and returns the result. Listens for WebSocket messages indicating output, error, or finish state and resolves the promise accordingly.
  - name: executeCommandRunUntilError
    link: /docs/api/apiaccess/terminal/executeCommandRunUntilError
    description: Executes a command and keeps running until an error occurs. Useful for continuous processes that should stop on first failure.
  - name: executeCommandWithStream
    link: /docs/api/apiaccess/terminal/executeCommandWithStream
    description: "Executes a command and streams output in real-time via EventEmitter. Ideal for long-running commands where you need to monitor output as it happens."
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
- **Basic Execution**: Run shell commands with `executeCommand()`
- **Stream Execution**: Monitor real-time output with `executeCommandWithStream()`
- **Error-Based Execution**: Run commands until error with `executeCommandRunUntilError()`
- **Process Control**: Interrupt running commands with `sendManualInterrupt()`
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

### Streaming Command Output

```js
// Execute command with real-time output streaming
const streamEmitter = codebolt.terminal.executeCommandWithStream('npm run build');

streamEmitter.on('commandOutput', (data) => {
    console.log('📡 Build output:', data.output);
});

streamEmitter.on('commandError', (error) => {
    console.error('❌ Build error:', error.error);
});

streamEmitter.on('commandFinish', (finish) => {
    console.log('✅ Build completed');
    console.log('Exit code:', finish.exitCode);
});
```

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
// Run build with streaming output
const buildEmitter = codebolt.terminal.executeCommandWithStream('npm run build');

let buildProgress = 0;

buildEmitter.on('commandOutput', (data) => {
    console.log(data.output);

    // Parse build progress
    const progressMatch = data.output.match(/(\d+)%/);
    if (progressMatch) {
        buildProgress = parseInt(progressMatch[1]);
        console.log(`📊 Build progress: ${buildProgress}%`);
    }
});

buildEmitter.on('commandFinish', (finish) => {
    if (finish.exitCode === 0) {
        console.log('✅ Build successful');
    } else {
        console.error('❌ Build failed');
    }
});
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
// Start development server
const serverEmitter = codebolt.terminal.executeCommandWithStream('npm start');

let serverReady = false;

serverEmitter.on('commandOutput', (data) => {
    console.log(data.output);

    // Detect when server is ready
    if (data.output.includes('Server running') || data.output.includes('localhost')) {
        serverReady = true;

        // Open browser to test
        setTimeout(async () => {
            await codebolt.browser.newPage();
            await codebolt.browser.goToPage('http://localhost:3000');
            console.log('✅ Browser opened to test server');
        }, 1000);
    }
});
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
// ❌ Bad: No timeout for long-running command
await codebolt.terminal.executeCommand('npm run build');

// ✅ Good: Use streaming or timeout
const emitter = codebolt.terminal.executeCommandWithStream('npm run build');
// Or
await executeWithTimeout('npm run build', 60000);
```

### Pitfall 4: Not Cleaning Up Processes
```js
// ❌ Bad: Leaves processes running
const server = codebolt.terminal.executeCommandWithStream('npm start');
// Forget about it...

// ✅ Good: Clean up properly
const server = codebolt.terminal.executeCommandWithStream('npm start');

// Later, when done:
await codebolt.terminal.sendManualInterrupt();
if (server.cleanup) {
    server.cleanup();
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

### 2. Use Streaming for Long Commands
```js
const emitter = codebolt.terminal.executeCommandWithStream('npm run build');

emitter.on('commandOutput', (data) => {
    console.log(data.output);
});

emitter.on('commandFinish', (finish) => {
    console.log('✅ Build completed');
});
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
// Use executeCommand for simple commands
await codebolt.terminal.executeCommand('ls -la');

// Use executeCommandWithStream for long-running commands
const emitter = codebolt.terminal.executeCommandWithStream('npm run build');

// Use executeCommandRunUntilError for continuous monitoring
await codebolt.terminal.executeCommandRunUntilError('npm run watch');
```

## Troubleshooting

### Common Issues and Solutions

**Issue**: Command not found
- **Solution**: Verify the command is installed and in PATH

**Issue**: Permission denied
- **Solution**: Check file permissions or use appropriate sudo privileges

**Issue**: Command hangs indefinitely
- **Solution**: Implement timeouts and use `sendManualInterrupt()`

**Issue**: Output not captured
- **Solution**: Check if command outputs to stderr instead of stdout

**Issue**: Exit code always 0
- **Solution**: Some commands don't set proper exit codes; check output for errors
