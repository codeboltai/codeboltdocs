---
name: listExecutors
description: List all available capability executors.
cbbaseinfo:
  description: List all available capability executors.
data:
  name: listExecutors
  category: capability
  link: listExecutors.md
---

# listExecutors

```text
codebolt.capability.listExecutors(): Promise<ListExecutorsResponse>
```

List all available capability executors

## Returns

Promise resolving to list of executors

Requirements: 9.3

## When to use it

Discover executor entries before showing a runtime choice. Executor availability depends on what this project can access.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.capability.listExecutors();
  console.log(result);
});
```
