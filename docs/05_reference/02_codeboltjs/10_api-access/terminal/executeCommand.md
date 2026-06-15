---
name: executeCommand
cbbaseinfo:
  description: Executes a command in the terminal environment. Short commands resolve with completion or error output; long-running commands can yield as a background process instead of blocking the caller.
cbparameters:
  parameters:
    - name: command
      typeName: string
      description: "The command to be executed in the terminal (e.g., \"node --version\", \"npm install\", \"ls -la\")."
    - name: options
      typeName: boolean | ExecuteCommandOptions
      description: Optional boolean for legacy returnEmptyStringOnSuccess behavior, or an options object with executionMode, yieldMs, timeoutMs, backgroundOnYield, and returnEmptyStringOnSuccess.
  returns:
    signatureTypeName: "Promise<CommandFinish | CommandError | CommandRunning>"
    description: "A promise that resolves with command completion, command failure, or a CommandRunning object when the command has yielded to the background."
data:
  name: executeCommand
  category: terminal
  link: executeCommand.md
---
# executeCommand

```typescript
codebolt.terminal.executeCommand(
  command: string,
  options?: boolean | {
    returnEmptyStringOnSuccess?: boolean;
    executionMode?: 'auto' | 'foreground' | 'background';
    yieldMs?: number;
    timeoutMs?: number;
    backgroundOnYield?: boolean;
  }
): Promise<CommandFinish | CommandError | CommandRunning>
```

Executes a command in the terminal environment. By default, `executeCommand()` uses `executionMode: 'auto'`: short commands resolve with final output, while long-running commands yield as `commandRunning` after the yield window and continue in the background.
### Parameters

- **`command`** (string): The command to be executed in the terminal (e.g., "node --version", "npm install", "ls -la").
- **`options`** (boolean | object, optional): Pass a boolean for legacy `returnEmptyStringOnSuccess` behavior, or an options object.
- **`options.returnEmptyStringOnSuccess`** (boolean, optional): Return an empty string on success instead of command output. Defaults to false.
- **`options.executionMode`** (`'auto' | 'foreground' | 'background'`, optional): Controls whether the command may yield to the background. Defaults to `'auto'`.
- **`options.yieldMs`** (number, optional): How long to wait before yielding to background in `auto` mode. Defaults to 3000ms. In `background` mode this is the startup output capture window.
- **`options.timeoutMs`** (number, optional): Hard timeout for the command. Timed out commands are stopped and return an error response.
- **`options.backgroundOnYield`** (boolean, optional): In `auto` mode, whether to yield long-running commands to background. Defaults to true.

### Returns

- **`Promise<CommandFinish | CommandError | CommandRunning>`**: A promise that resolves with completion, failure, or a background process response.

### Response Structure

The method returns a Promise that resolves to a [`CommandFinish`](/docs/reference/codeboltjs/type-reference/types/interfaces/CommandFinish), [`CommandError`](/docs/reference/codeboltjs/type-reference/types/interfaces/CommandError), or `CommandRunning` object:

#### CommandFinish (Success Response)
- **`type`** (string): Always "commandFinish".
- **`exitCode`** (number): The exit code of the command (0 for success).
- **`stdout`** (string, optional): Standard output from the command.
- **`stderr`** (string, optional): Standard error output from the command.
- **`success`** (boolean, optional): Indicates if the operation was successful.
- **`message`** (string, optional): Additional information about the response.
- **`data`** (any, optional): Additional data from the response.
- **`messageId`** (string, optional): Unique identifier for the message.
- **`threadId`** (string, optional): Thread identifier for the request.

#### CommandRunning (Background Response)
- **`type`** (string): Always `"commandRunning"`.
- **`processId`** (number): Process id for the background command. Use this with `readCommandOutput()` and `stopCommand()`.
- **`status`** (string): Usually `"running"`.
- **`stdout`** (string, optional): Output captured before the command yielded.
- **`output`** (string, optional): Output captured before the command yielded.
- **`message`** (string, optional): Additional information about why the command yielded.

### Execution Modes

| Mode | Behavior | Use when |
| --- | --- | --- |
| `auto` | Waits for normal completion up to the yield window, then returns `commandRunning` and leaves the process in the background. | Default for agent commands that may be short or long. |
| `foreground` | Waits for the command to finish or timeout. | You need the final exit code and output before continuing. |
| `background` | Starts the command, captures brief startup output, then returns `commandRunning`. | You already know the command is persistent, such as `npm run dev` or a watcher. |

### Background Command Management

```javascript
const server = await codebolt.terminal.executeCommand('npm run dev', {
    executionMode: 'background'
});

if (server.type === 'commandRunning') {
    const commands = await codebolt.terminal.listCommands();
    const output = await codebolt.terminal.readCommandOutput(server.processId, { lines: 100 });

    console.log(commands);
    console.log(output.output);

    await codebolt.terminal.stopCommand(server.processId);
}
```

- **`listCommands()`**: Lists active background commands with process ids, status, command text, and timestamps.
- **`readCommandOutput(processId, { lines?, tailBytes? })`**: Reads recent output for a background command.
- **`stopCommand(processId)`**: Stops a background command.

#### CommandError (Error Response)
- **`type`** (string): Always "commandError".
- **`error`** (string): Error message describing what went wrong.
- **`exitCode`** (number, optional): The exit code of the failed command.
- **`stderr`** (string, optional): Standard error output from the command.
- **`success`** (boolean, optional): Indicates if the operation was successful (typically false).
- **`message`** (string, optional): Additional information about the response.
- **`data`** (any, optional): Additional data from the response.
- **`messageId`** (string, optional): Unique identifier for the message.
- **`threadId`** (string, optional): Thread identifier for the request.

### Examples

```javascript
// Example 1: Basic command execution
const nodeVersionResult = await codebolt.terminal.executeCommand('node --version');
console.log('✅ Node version:', nodeVersionResult);
console.log('Exit code:', nodeVersionResult.exitCode);
console.log('Output:', nodeVersionResult.stdout);

// Example 2: Command with npm version check
const npmVersionResult = await codebolt.terminal.executeCommand('npm --version');
console.log('✅ NPM version:', npmVersionResult);

// Example 3: Command with returnEmptyStringOnSuccess option
const emptyResult = await codebolt.terminal.executeCommand('echo "test"', {
    returnEmptyStringOnSuccess: true
});
console.log('✅ Empty result (success):', emptyResult);
if (emptyResult.type === 'commandFinish') {
    console.log('Command completed successfully with exit code:', emptyResult.exitCode);
}

// Example 4: Error handling with try-catch
const executeWithErrorHandling = async (command) => {
    try {
        const result = await codebolt.terminal.executeCommand(command);
        
        if (result.type === 'commandFinish') {
            console.log('✅ Command succeeded');
            console.log('Exit code:', result.exitCode);
            console.log('Output:', result.stdout);
            return result;
        } else if (result.type === 'commandError') {
            console.error('❌ Command failed');
            console.error('Error:', result.error);
            console.error('Exit code:', result.exitCode);
            console.error('Stderr:', result.stderr);
            return result;
        }
    } catch (error) {
        console.error('❌ Exception during command execution:', error.message);
        throw error;
    }
};

// Usage
await executeWithErrorHandling('ls -la');
await executeWithErrorHandling('invalidcommand');

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

// Example 7: System information gathering
const gatherSystemInfo = async () => {
    const commands = [
        { name: 'OS Info', cmd: 'uname -a' },
        { name: 'Current Directory', cmd: 'pwd' },
        { name: 'Disk Space', cmd: 'df -h' },
        { name: 'Memory Info', cmd: 'free -h' },
        { name: 'Node Version', cmd: 'node --version' },
        { name: 'NPM Version', cmd: 'npm --version' }
    ];
    
    const systemInfo = {};
    
    for (const { name, cmd } of commands) {
        try {
            const result = await codebolt.terminal.executeCommand(cmd);
            
            if (result.type === 'commandFinish') {
                systemInfo[name] = {
                    success: true,
                    output: result.stdout?.trim(),
                    exitCode: result.exitCode
                };
                console.log(`✅ ${name}: ${result.stdout?.trim()}`);
            } else {
                systemInfo[name] = {
                    success: false,
                    error: result.error,
                    exitCode: result.exitCode
                };
                console.log(`❌ ${name}: ${result.error}`);
            }
        } catch (error) {
            systemInfo[name] = {
                success: false,
                error: error.message
            };
            console.log(`❌ ${name}: Exception - ${error.message}`);
        }
    }
    
    return systemInfo;
};

// Example 8: Command execution with timeout
const executeWithTimeout = async (command, timeoutMs = 10000) => {
    console.log(`🔄 Executing: ${command}`);

    const result = await codebolt.terminal.executeCommand(command, {
        executionMode: 'foreground',
        timeoutMs
    });

    if (result.type === 'commandFinish') {
        console.log(`✅ Command completed in time`);
    } else if (result.type === 'commandError') {
        console.log(`❌ Command failed or timed out`);
        console.log(`Error: ${result.error}`);
    }

    return result;
};

// Usage
await executeWithTimeout('echo "Quick command"', 5000);

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

// Example 10: Batch command execution with results summary
const batchExecution = async (commands) => {
    const results = [];
    let successCount = 0;
    let failureCount = 0;
    
    console.log(`🔄 Executing ${commands.length} commands...`);
    
    for (let i = 0; i < commands.length; i++) {
        const command = commands[i];
        console.log(`[${i + 1}/${commands.length}] Executing: ${command}`);
        
        try {
            const result = await codebolt.terminal.executeCommand(command);
            
            if (result.type === 'commandFinish') {
                successCount++;
                console.log(`✅ [${i + 1}] Success (exit code: ${result.exitCode})`);
            } else {
                failureCount++;
                console.log(`❌ [${i + 1}] Failed: ${result.error}`);
            }
            
            results.push({
                command,
                result,
                index: i + 1,
                success: result.type === 'commandFinish'
            });
        } catch (error) {
            failureCount++;
            console.log(`❌ [${i + 1}] Exception: ${error.message}`);
            results.push({
                command,
                error: error.message,
                index: i + 1,
                success: false
            });
        }
    }
    
    console.log(`📊 Batch execution summary:`);
    console.log(`   ✅ Successful: ${successCount}`);
    console.log(`   ❌ Failed: ${failureCount}`);
    console.log(`   📈 Success rate: ${Math.round(successCount / commands.length * 100)}%`);
    
    return results;
};

// Usage
const commands = [
    'echo "Hello World"',
    'pwd',
    'whoami',
    'date',
    'invalidcommand123'
];

const batchResults = await batchExecution(commands);
```

### Common Use Cases

1. **Version Checking**: Check versions of installed tools and dependencies
2. **File Operations**: Create, move, copy, and delete files and directories
3. **Package Management**: Install, update, and manage project dependencies
4. **Build Operations**: Compile, build, and package applications
5. **System Information**: Gather information about the system environment
6. **Git Operations**: Execute Git commands for version control
7. **Development Tools**: Run linters, formatters, and testing tools
8. **Environment Setup**: Configure development environments and tools

### Notes

- In `auto` mode, the method waits briefly for command completion before yielding long-running commands to the background
- Exit code 0 typically indicates successful command execution
- Pass `returnEmptyStringOnSuccess` when you only need to know if a command succeeded
- Both `stdout` and `stderr` may contain output depending on the command
- Commands are executed in the current working directory of the terminal
- For known persistent commands, pass `executionMode: 'background'`
- For live incremental output events, use `executeCommandWithStream()`
- Always handle success ([`CommandFinish`](/docs/reference/codeboltjs/type-reference/types/interfaces/CommandFinish)), error ([`CommandError`](/docs/reference/codeboltjs/type-reference/types/interfaces/CommandError)), and background (`CommandRunning`) response types
- Use `timeoutMs` for foreground commands that must not run indefinitely
