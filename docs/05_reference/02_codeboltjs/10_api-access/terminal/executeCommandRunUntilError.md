---
name: executeCommandRunUntilError
cbbaseinfo:
  description: "Executes a given command and keeps running until an error occurs. This method is designed for long-running processes that should continue executing until they encounter an error condition. It listens for WebSocket messages and resolves the promise when an error is encountered."
cbparameters:
  parameters:
    - name: command
      typeName: string
      description: "The command to be executed and monitored for errors (e.g., \"npm run dev\", \"npm start\", \"python server.py\")."
    - name: executeInMain
      typeName: boolean
      description: Optional parameter to execute the command in the main terminal instead of a separate terminal instance. Defaults to false.
  returns:
    signatureTypeName: "Promise<CommandError>"
    description: A promise that resolves with a CommandError object when an error occurs during command execution, indicating the command has stopped due to an error condition.
data:
  name: executeCommandRunUntilError
  category: terminal
  link: executeCommandRunUntilError.md
---
# executeCommandRunUntilError

:::caution Legacy API
Prefer `executeCommand()` with `executionMode: 'background'` or `executionMode: 'auto'` for new agent-facing command execution. Use this method only when maintaining older code that expects the promise to resolve only after an error.
:::

```typescript
codebolt.terminal.executeCommandRunUntilError(command: string, executeInMain: boolean): Promise<CommandError>
```

Executes a command and keeps running until an error occurs. This API is kept for compatibility with older agents. For new code, prefer `executeCommand(command, { executionMode: 'background' })` plus `listCommands()`, `readCommandOutput()`, and `stopCommand()` so the caller receives a process id and can manage the background command explicitly.
### Parameters

- **`command`** (string): The command to be executed and monitored for errors (e.g., "npm run dev", "npm start", "python server.py").
- **`executeInMain`** (boolean): Optional parameter to execute the command in the main terminal instead of a separate terminal instance. Defaults to false.

### Returns

- **`Promise<CommandError>`**: A promise that resolves with a CommandError object when an error occurs during command execution, indicating the command has stopped due to an error condition.

### Response Structure

The method returns a Promise that resolves to a [`CommandError`](/docs/reference/codeboltjs/type-reference/types/interfaces/CommandError) object when an error occurs:

#### CommandError (Error Response)
- **`type`** (string): Always "commandError".
- **`error`** (string): Error message describing what went wrong or why the command stopped.
- **`exitCode`** (number, optional): The exit code of the failed command.
- **`stderr`** (string, optional): Standard error output from the command.
- **`success`** (boolean, optional): Indicates if the operation was successful (typically false for this method).
- **`message`** (string, optional): Additional information about the response.
- **`data`** (any, optional): Additional data from the response.
- **`messageId`** (string, optional): Unique identifier for the message.
- **`threadId`** (string, optional): Thread identifier for the request.

### Examples

```javascript
// Example 1: Run development server until error
const runDevServer = async () => {
    try {
        console.log('🔄 Starting development server...');
        const errorResult = await codebolt.terminal.executeCommandRunUntilError('npm run dev');
        
        console.log('❌ Development server stopped due to error:');
        console.log('Error:', errorResult.error);
        console.log('Exit code:', errorResult.exitCode);
        console.log('Stderr:', errorResult.stderr);
        
        return errorResult;
    } catch (error) {
        console.error('❌ Exception during server execution:', error.message);
        throw error;
    }
};

// Preferred for new code
const server = await codebolt.terminal.executeCommand('npm run dev', {
    executionMode: 'background'
});

if (server.type === 'commandRunning') {
    const output = await codebolt.terminal.readCommandOutput(server.processId, { lines: 100 });
    console.log(output.output);
    await codebolt.terminal.stopCommand(server.processId);
}

// Legacy usage
await runDevServer();

// Example 2: Run in main terminal
const runInMainTerminal = async () => {
    try {
        console.log('🔄 Starting application in main terminal...');
        const result = await codebolt.terminal.executeCommandRunUntilError('npm start', true);
        
        console.log('❌ Application stopped in main terminal:');
        console.log('Error details:', result.error);
        
        return result;
    } catch (error) {
        console.error('❌ Main terminal execution failed:', error.message);
        throw error;
    }
};

// Example 3: Monitor long-running process with error handling
const monitorProcess = async (command, description) => {
    console.log(`🔄 Starting ${description}...`);
    console.log(`Command: ${command}`);
    
    const startTime = Date.now();
    
    try {
        const errorResult = await codebolt.terminal.executeCommandRunUntilError(command);
        
        const duration = Date.now() - startTime;
        const durationSeconds = Math.round(duration / 1000);
        
        console.log(`❌ ${description} stopped after ${durationSeconds} seconds`);
        console.log('Error details:');
        console.log('  Type:', errorResult.type);
        console.log('  Error:', errorResult.error);
        console.log('  Exit Code:', errorResult.exitCode);
        
        if (errorResult.stderr) {
            console.log('  Stderr:', errorResult.stderr);
        }
        
        return {
            command,
            description,
            duration: durationSeconds,
            error: errorResult
        };
    } catch (error) {
        console.error(`❌ Exception while monitoring ${description}:`, error.message);
        throw error;
    }
};

// Usage
await monitorProcess('python -m http.server 8000', 'Python HTTP Server');
await monitorProcess('node server.js', 'Node.js Server');

// Example 4: Development workflow with automatic restart
const developmentWorkflow = async () => {
    const maxRetries = 3;
    let retryCount = 0;
    
    while (retryCount < maxRetries) {
        try {
            console.log(`🔄 Starting development server (attempt ${retryCount + 1}/${maxRetries})...`);
            
            const errorResult = await codebolt.terminal.executeCommandRunUntilError('npm run dev');
            
            console.log(`❌ Development server crashed:`);
            console.log('Error:', errorResult.error);
            
            // Check if error is recoverable
            const isRecoverable = !errorResult.error.includes('EADDRINUSE') && 
                                 !errorResult.error.includes('permission denied') &&
                                 errorResult.exitCode !== 1;
            
            if (isRecoverable && retryCount < maxRetries - 1) {
                retryCount++;
                console.log('🔄 Error appears recoverable, retrying in 5 seconds...');
                await new Promise(resolve => setTimeout(resolve, 5000));
            } else {
                console.log('❌ Error is not recoverable or max retries reached');
                return errorResult;
            }
        } catch (error) {
            console.error('❌ Exception in development workflow:', error.message);
            retryCount++;
            
            if (retryCount >= maxRetries) {
                throw error;
            }
        }
    }
};

// Example 5: Process monitoring with health checks
const monitorWithHealthCheck = async (command, healthCheckInterval = 30000) => {
    console.log(`🔄 Starting monitored process: ${command}`);
    console.log(`Health check interval: ${healthCheckInterval}ms`);
    
    // Set up health check interval
    const healthCheckTimer = setInterval(() => {
        console.log('💓 Process is still running...');
    }, healthCheckInterval);
    
    try {
        const errorResult = await codebolt.terminal.executeCommandRunUntilError(command);
        
        clearInterval(healthCheckTimer);
        
        console.log('❌ Process stopped with error:');
        console.log('Error:', errorResult.error);
        console.log('Exit code:', errorResult.exitCode);
        
        // Analyze error type
        if (errorResult.error.includes('SIGTERM')) {
            console.log('🔄 Process was terminated externally');
        } else if (errorResult.error.includes('SIGKILL')) {
            console.log('💀 Process was forcefully killed');
        } else if (errorResult.exitCode && errorResult.exitCode > 0) {
            console.log('⚠️ Process exited with error code');
        }
        
        return errorResult;
    } catch (error) {
        clearInterval(healthCheckTimer);
        console.error('❌ Exception during monitoring:', error.message);
        throw error;
    }
};

// Example 6: Server monitoring with log analysis
const monitorServerWithLogs = async (serverCommand) => {
    console.log(`🔄 Starting server with log monitoring: ${serverCommand}`);
    
    const logPatterns = {
        critical: /CRITICAL|FATAL|EMERGENCY/i,
        error: /ERROR|EXCEPTION|FAIL/i,
        warning: /WARN|WARNING/i,
        info: /INFO|STARTED|LISTENING/i
    };
    
    try {
        const errorResult = await codebolt.terminal.executeCommandRunUntilError(serverCommand);
        
        console.log('❌ Server stopped with error:');
        console.log('Error message:', errorResult.error);
        
        // Analyze error message for patterns
        const errorMessage = errorResult.error.toLowerCase();
        
        if (logPatterns.critical.test(errorMessage)) {
            console.log('🚨 CRITICAL ERROR detected');
        } else if (logPatterns.error.test(errorMessage)) {
            console.log('❌ ERROR level issue detected');
        } else if (logPatterns.warning.test(errorMessage)) {
            console.log('⚠️ WARNING level issue detected');
        }
        
        // Check for common server issues
        if (errorMessage.includes('port') && errorMessage.includes('use')) {
            console.log('🔌 Port conflict detected - another service may be using the port');
        } else if (errorMessage.includes('permission')) {
            console.log('🔒 Permission issue detected - check file/port permissions');
        } else if (errorMessage.includes('memory') || errorMessage.includes('heap')) {
            console.log('🧠 Memory issue detected - consider increasing memory allocation');
        }
        
        return errorResult;
    } catch (error) {
        console.error('❌ Exception during server monitoring:', error.message);
        throw error;
    }
};

// Example 7: Batch process monitoring
const monitorMultipleProcesses = async (commands) => {
    const results = [];
    
    console.log(`🔄 Starting monitoring for ${commands.length} processes...`);
    
    for (let i = 0; i < commands.length; i++) {
        const { name, command, executeInMain = false } = commands[i];
        
        console.log(`[${i + 1}/${commands.length}] Starting ${name}...`);
        
        try {
            const startTime = Date.now();
            const errorResult = await codebolt.terminal.executeCommandRunUntilError(command, executeInMain);
            const duration = Date.now() - startTime;
            
            console.log(`❌ [${i + 1}] ${name} stopped after ${Math.round(duration / 1000)}s`);
            console.log(`    Error: ${errorResult.error}`);
            
            results.push({
                name,
                command,
                duration: Math.round(duration / 1000),
                error: errorResult,
                success: false
            });
        } catch (error) {
            console.log(`❌ [${i + 1}] ${name} failed with exception: ${error.message}`);
            
            results.push({
                name,
                command,
                error: error.message,
                success: false,
                exception: true
            });
        }
    }
    
    console.log('📊 Monitoring summary:');
    results.forEach((result, index) => {
        console.log(`  ${index + 1}. ${result.name}: ${result.exception ? 'Exception' : 'Error'} after ${result.duration || 0}s`);
    });
    
    return results;
};

// Usage
const processesToMonitor = [
    { name: 'Web Server', command: 'npm run start' },
    { name: 'API Server', command: 'node api-server.js' },
    { name: 'Background Worker', command: 'python worker.py', executeInMain: true }
];

await monitorMultipleProcesses(processesToMonitor);

// Example 8: Graceful process monitoring with cleanup
const monitorWithCleanup = async (command, cleanupCommands = []) => {
    console.log(`🔄 Starting monitored process with cleanup: ${command}`);
    
    let processResult = null;
    
    try {
        processResult = await codebolt.terminal.executeCommandRunUntilError(command);
        
        console.log('❌ Process stopped with error:');
        console.log('Error:', processResult.error);
        
    } catch (error) {
        console.error('❌ Exception during process execution:', error.message);
        processResult = { error: error.message, type: 'exception' };
    } finally {
        // Run cleanup commands
        if (cleanupCommands.length > 0) {
            console.log('🧹 Running cleanup commands...');
            
            for (const cleanupCmd of cleanupCommands) {
                try {
                    console.log(`  Running: ${cleanupCmd}`);
                    const cleanupResult = await codebolt.terminal.executeCommand(cleanupCmd);
                    
                    if (cleanupResult.type === 'commandFinish') {
                        console.log(`  ✅ Cleanup successful`);
                    } else {
                        console.log(`  ⚠️ Cleanup warning: ${cleanupResult.error}`);
                    }
                } catch (cleanupError) {
                    console.log(`  ❌ Cleanup failed: ${cleanupError.message}`);
                }
            }
            
            console.log('🧹 Cleanup completed');
        }
    }
    
    return processResult;
};

// Usage
await monitorWithCleanup(
    'npm run dev',
    [
        'pkill -f "node.*dev"',  // Kill any remaining dev processes
        'rm -rf temp/',          // Clean up temporary files
        'echo "Cleanup completed"'
    ]
);
```

### Common Use Cases

1. **Development Servers**: Monitor development servers that should run continuously until manually stopped
2. **Build Processes**: Run build watchers that monitor file changes until an error occurs
3. **Background Services**: Monitor long-running background services and daemons
4. **Testing Environments**: Run test suites in watch mode until failures occur
5. **Production Monitoring**: Monitor production processes and detect when they crash
6. **CI/CD Pipelines**: Run deployment processes that should continue until completion or error
7. **File Watchers**: Monitor file system changes until an error in processing occurs
8. **Network Services**: Monitor network services and detect connection issues

### Notes

- This method is specifically designed for long-running processes that should continue until an error
- The promise only resolves when an error occurs, not on successful completion
- Use `executeInMain: true` when you need the command to run in the main terminal context
- The method is ideal for monitoring development servers, build processes, and background services
- Consider implementing retry logic for recoverable errors
- Always handle the resolved [`CommandError`](/docs/reference/codeboltjs/type-reference/types/interfaces/CommandError) to understand why the process stopped
- For processes that should run indefinitely, this method helps detect when they unexpectedly terminate
- Use appropriate cleanup procedures when the monitored process stops
