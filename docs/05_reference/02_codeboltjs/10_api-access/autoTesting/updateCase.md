---
name: updateCase
description: Updates an existing test case's properties or steps.
cbbaseinfo:
  description: Updates an existing test case's properties or steps.
data:
  name: updateCase
  category: autoTesting
  link: updateCase.md
---

# updateCase

```text
codebolt.autoTesting.updateCase(params: IUpdateCaseParams): Promise<IUpdateCaseResponse>
```

Updates an existing test case's properties or steps.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.autoTesting.updateCase({
    id: 'case-123',
    name: 'Updated Test Name'
  });
  console.log(result);
});
```
