---
name: executeCommandWithStream
description: Executes a given command and streams the output.
cbbaseinfo:
  description: Executes a given command and streams the output.
data:
  name: executeCommandWithStream
  category: terminal
  link: executeCommandWithStream.md
---

# executeCommandWithStream

```text
codebolt.terminal.executeCommandWithStream(command: string, executeInMain?: boolean): CustomEventEmitter
```

Executes a given command and streams the output.
Listens for messages from the WebSocket and streams the output data.

## Parameters

- `command` — The command to be executed.

## Returns

A `CustomEventEmitter` with `commandOutput`, `commandError`, and `commandFinish` events. Call `cleanup()` to remove the SDK message listener when streaming finishes.

## When to use it

Display build or test output as it arrives. Remove the listener when you finish monitoring.

## Examples

### Read command output as it arrives

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const command = codebolt.terminal.executeCommandWithStream('git status --short');
  command.on('commandOutput', output => console.log(output));
  command.on('commandError', error => console.error(error));
  command.on('commandFinish', result => {
    console.log(result);
    command.cleanup?.();
  });
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(() => {
  // Example 1: Basic streaming command
  const basicStreamExample = () => {
      const streamEmitter = codebolt.terminal.executeCommandWithStream('echo "Streaming test"');

      streamEmitter.on('commandOutput', (data) => {
          console.log('📡 Stream output:', data.output);
          console.log('   Type:', data.type);
          if (data.stdout) {
              console.log('   Stdout:', data.stdout);
          }
      });

      streamEmitter.on('commandError', (error) => {
          console.error('❌ Stream error:', error.error);
          console.error('   Exit code:', error.exitCode);
          if (error.stderr) {
              console.error('   Stderr:', error.stderr);
          }
      });

      streamEmitter.on('commandFinish', (finish) => {
          console.log('✅ Stream finished');
          console.log('   Exit code:', finish.exitCode);
          console.log('   Type:', finish.type);

          // Clean up the emitter
          if (streamEmitter.cleanup) {
              streamEmitter.cleanup();
          }
      });

      return streamEmitter;
  };

  // Usage
  const emitter = basicStreamExample();
});
```

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(() => {
  // Example 2: Long-running build process with progress monitoring
  const monitorBuildProcess = () => {
      const buildEmitter = codebolt.terminal.executeCommandWithStream('npm run build');

      let outputBuffer = '';
      let errorBuffer = '';

      buildEmitter.on('commandOutput', (data) => {
          outputBuffer += data.output;

          console.log('🔨 Build output:', data.output);

          // Check for specific build milestones
          if (data.output.includes('Compilation successful')) {
              console.log('🎉 Build completed successfully!');
          } else if (data.output.includes('Compilation failed')) {
              console.log('❌ Build compilation failed!');
          } else if (data.output.includes('webpack')) {
              console.log('📦 Webpack processing...');
          } else if (data.output.includes('TypeScript')) {
              console.log('📘 TypeScript compilation...');
          }

          // Monitor build progress
          const progressMatch = data.output.match(/(\d+)%/);
          if (progressMatch) {
              const progress = parseInt(progressMatch[1]);
              console.log(`📊 Build progress: ${progress}%`);
          }
      });

      buildEmitter.on('commandError', (error) => {
          errorBuffer += error.error;

          console.error('❌ Build error:', error.error);

          // Analyze error types
          if (error.error.includes('Module not found')) {
              console.error('📦 Missing module dependency detected');
          } else if (error.error.includes('TypeScript')) {
              console.error('📘 TypeScript compilation error');
          } else if (error.error.includes('Syntax')) {
              console.error('📝 Syntax error in code');
          }
      });

      buildEmitter.on('commandFinish', (finish) => {
          console.log('🏁 Build process finished');
          console.log('   Exit code:', finish.exitCode);

          if (finish.exitCode === 0) {
              console.log('✅ Build successful!');
              console.log('📄 Total output length:', outputBuffer.length);
          } else {
              console.log('❌ Build failed!');
              console.log('📄 Error summary:', errorBuffer.substring(0, 200) + '...');
          }

          // Clean up
          if (buildEmitter.cleanup) {
              buildEmitter.cleanup();
          }
      });

      return buildEmitter;
  };
});
```
