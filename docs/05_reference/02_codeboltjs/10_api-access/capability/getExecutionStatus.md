---
name: getExecutionStatus
description: Get the status of a capability execution.
cbbaseinfo:
  description: Get the status of a capability execution.
data:
  name: getExecutionStatus
  category: capability
  link: getExecutionStatus.md
---

# getExecutionStatus

```text
codebolt.capability.getExecutionStatus(executionId: string): Promise<GetExecutionStatusResponse>
```

Get the status of a capability execution

## Parameters

- `executionId` — ID of the execution

## Returns

Promise resolving to execution status

## When to use it

Inspect a previously started capability using its execution ID. Use the returned state in a run dashboard or wait loop.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const trackMultiple = async (executionIds: string[]) => {
    const statuses = await Promise.all(
      executionIds.map(async (id) => {
        const status = await codebolt.capability.getExecutionStatus(id);
        return { id, status: status.execution?.status };
      })
    );

    return statuses;
  };
});
```
