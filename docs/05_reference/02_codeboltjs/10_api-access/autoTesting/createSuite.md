---
name: createSuite
description: Creates a new test suite for organizing test cases.
cbbaseinfo:
  description: Creates a new test suite for organizing test cases.
data:
  name: createSuite
  category: autoTesting
  link: createSuite.md
---

# createSuite

```text
codebolt.autoTesting.createSuite(params: ICreateSuiteParams): Promise<ICreateSuiteResponse>
```

Creates a new test suite for organizing test cases.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.autoTesting.createSuite({
    name: 'Authentication Tests',
    description: 'Tests for user authentication'
  });
  console.log(result);
});
```
