---
name: startWithActionBlock
description: Start a side execution with an ActionBlock path.
cbbaseinfo:
  description: Start a side execution with an ActionBlock path.
data:
  name: startWithActionBlock
  category: sideExecution
  link: startWithActionBlock.md
---

# startWithActionBlock

```text
codebolt.sideExecution.startWithActionBlock(actionBlockPath: string, params?: Record<string, any>, timeout?: number): Promise<StartSideExecutionResponse>
```

Start a side execution with an ActionBlock path

## Parameters

- `actionBlockPath` — Path to the ActionBlock directory
- `params` — Additional parameters to pass to the ActionBlock
- `timeout` — Execution timeout in milliseconds (default: 5 minutes)

## Returns

Promise resolving to the side execution ID

## When to use it

Run an existing action block by path with the inputs it expects. Set a timeout if the caller needs a bounded execution.

## Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Start a long-running ActionBlock with extended timeout
  const result = await codebolt.sideExecution.startWithActionBlock(
    '/jobs/data-sync',
    { source: 'production', target: 'backup' },
    600000 // 10 minutes
  );
  console.log('✅ Long job started with 10-minute timeout');
});
```
