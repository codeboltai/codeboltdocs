---
name: stopCapability
description: Stop a running capability execution.
cbbaseinfo:
  description: Stop a running capability execution.
data:
  name: stopCapability
  category: capability
  link: stopCapability.md
---

# stopCapability

```text
codebolt.capability.stopCapability(executionId: string): Promise<StopCapabilityResponse>
```

Stop a running capability execution

## Parameters

- `executionId` — ID of the execution to stop

## Returns

Promise resolving to success status

Requirements: 9.5

## When to use it

Request cancellation for a run you started. Use its execution ID and check the returned status before considering it stopped.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const gracefulShutdown = async (executionId: string) => {
    const stop = await codebolt.capability.stopCapability(executionId);

    if (stop.success) {
      console.log('Execution stopped cleanly');
      // Perform cleanup
    }
  };
});
```

## More examples

### Batch Cancellation

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const stopAllExecutions = async (executionIds: string[]) => {
    const results = await Promise.allSettled(
      executionIds.map(id => codebolt.capability.stopCapability(id))
    );

    results.forEach((result, i) => {
      if (result.status === 'fulfilled') {
        console.log(`Execution ${i} stopped:`, result.value.success);
      }
    });
  };
});
```
