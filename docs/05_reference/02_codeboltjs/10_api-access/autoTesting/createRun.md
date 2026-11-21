---
name: createRun
description: Creates a new test run from a test suite for execution tracking.
cbbaseinfo:
  description: Creates a new test run from a test suite for execution tracking.
data:
  name: createRun
  category: autoTesting
  link: createRun.md
---

# createRun

```text
codebolt.autoTesting.createRun(params: ICreateRunParams): Promise<ICreateRunResponse>
```

Creates a new test run from a test suite for execution tracking.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.autoTesting.createRun({
    testSuiteId: 'suite-123',
    name: 'Nightly Build Test Run'
  });
  console.log(result);
});
```
