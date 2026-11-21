---
name: startPower
description: Start a power execution.
cbbaseinfo:
  description: Start a power execution.
data:
  name: startPower
  category: capability
  link: startPower.md
---

# startPower

```text
codebolt.capability.startPower(powerName: string, params?: Record<string, any>, timeout?: number): Promise<StartCapabilityResponse>
```

Start a power execution

## Parameters

- `powerName` — Name of the power to execute
- `params` — Optional parameters to pass to the power
- `timeout` — Optional execution timeout in milliseconds

## Returns

Promise resolving to execution ID

Requirements: 9.4

## When to use it

Start a known power after looking up its input definition. The operations it performs depend on the selected power.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const processBigData = async (source: string) => {
    const result = await codebolt.capability.startPower('distributed-processor', {
      source,
      nodes: 4,
      memory: '8GB'
    });

    return result;
  };
});
```

## More examples

### Execute a Power

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.capability.startPower('advanced-processor', {
    input: 'large-dataset.csv',
    mode: 'distributed'
  });

  if (result.success) {
    console.log('Power execution started:', result.executionId);
  }
});
```

### Long-Running Power with Timeout

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const execution = await codebolt.capability.startPower(
    'ml-model-trainer',
    {
      dataset: 'training-data.csv',
      algorithm: 'neural-network',
      epochs: 100
    },
    600000 // 10 minutes
  );

  console.log('Training started:', execution.executionId);
});
```

### Machine Learning Operations

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const trainModel = async (data: string) => {
    const training = await codebolt.capability.startPower('ml-trainer', {
      dataset: data,
      modelType: 'classification',
      validationSplit: 0.2
    });

    return training.executionId;
  };
});
```
