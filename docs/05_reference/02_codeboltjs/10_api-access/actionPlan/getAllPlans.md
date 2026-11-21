---
name: getAllPlans
description: Get all execution plans.
cbbaseinfo:
  description: Get all execution plans.
---

# getAllPlans

```text
codebolt.executionPlan.getAllPlans(): Promise<any>
```

Get all execution plans

## Returns

Promise with all execution plans

## When to use it

Use the returned plans to populate a selection list or choose an existing plan before requesting its details.

## Examples

### Syntax

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(() => {
  codebolt.executionPlan.getAllPlans()
});
```

### Error Handling

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  try {
    const response = await codebolt.executionPlan.getAllPlans();

    if (!response.success) {
      console.error('Failed to fetch plans:', response.error);
      return;
    }

    // Process plans
  } catch (error) {
    console.error('Network or system error:', error);
  }
});
```
