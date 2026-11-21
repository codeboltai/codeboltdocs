---
name: getStatus
description: Get the status of a side execution.
cbbaseinfo:
  description: Get the status of a side execution.
data:
  name: getStatus
  category: sideExecution
  link: getStatus.md
---

# getStatus

```text
codebolt.sideExecution.getStatus(sideExecutionId: string): Promise<GetSideExecutionStatusResponse>
```

Get the status of a side execution

## Parameters

- `sideExecutionId` — ID of the side execution

## Returns

Promise resolving to execution status

## When to use it

Inspect a run you have already started. Use the response to update a monitoring view or decide whether to follow up.

## Example

### Inspect an existing side execution

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const status = await codebolt.sideExecution.getStatus('side-execution-id');
  console.log(status);
});
```

## Start a small execution and then inspect it

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const started = await codebolt.sideExecution.startWithCode('return 2 + 2');
  if (!started.success || !started.sideExecutionId) return;
  const status = await codebolt.sideExecution.getStatus(started.sideExecutionId);
  console.log(status);
});
```
