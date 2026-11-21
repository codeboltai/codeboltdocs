# Side Execution

Start and stop side executions and query their status.

## When to use it

Run a focused operation in a side execution and use its ID to inspect or stop it. Use a named block when you already have a reusable implementation.

## Examples

### Long-Running Tasks

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Execute a data processing task that runs for minutes
  const result = await codebolt.sideExecution.startWithActionBlock(
    '/processors/data-sync',
    { source: 'api', target: 'database' },
    600000 // 10 minutes
  );
});
```

### Parallel Execution

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Run multiple processes in parallel
  const executions = await Promise.all([
    codebolt.sideExecution.startWithActionBlock('/tasks/task1'),
    codebolt.sideExecution.startWithActionBlock('/tasks/task2'),
    codebolt.sideExecution.startWithActionBlock('/tasks/task3')
  ]);
  console.log('Started', executions.length, 'parallel executions');
});
```

## SDK methods

### startWithActionBlock

[`startWithActionBlock`](startWithActionBlock.md) · Start a side execution with an ActionBlock path.

### startWithCode

[`startWithCode`](startWithCode.md) · Start a side execution with inline JavaScript code.

### stop

[`stop`](stop.md) · Stop a running side execution.

### listActionBlocks

[`listActionBlocks`](listActionBlocks.md) · List all available ActionBlocks.

### getStatus

[`getStatus`](getStatus.md) · Get the status of a side execution.
