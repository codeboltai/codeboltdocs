---
name: stop
description: Stop a running side execution.
cbbaseinfo:
  description: Stop a running side execution.
data:
  name: stop
  category: sideExecution
  link: stop.md
---

# stop

```text
codebolt.sideExecution.stop(sideExecutionId: string): Promise<StopSideExecutionResponse>
```

Stop a running side execution

## Parameters

- `sideExecutionId` — ID of the side execution to stop

## Returns

Promise resolving to success status

## When to use it

Request cancellation when a side execution is no longer needed, then check whether it stopped.

## Example

### Stop an execution started earlier

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const stopped = await codebolt.sideExecution.stop('side-execution-id');
  console.log(stopped);
});
```
