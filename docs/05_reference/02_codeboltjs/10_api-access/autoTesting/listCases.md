---
name: listCases
description: Lists all available test cases.
cbbaseinfo:
  description: Lists all available test cases.
data:
  name: listCases
  category: autoTesting
  link: listCases.md
---

# listCases

```text
codebolt.autoTesting.listCases(_params?: IListCasesParams): Promise<IListCasesResponse>
```

Lists all available test cases.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const cases = await codebolt.autoTesting.listCases();
  console.log('Available test cases:', cases.payload.cases);
});
```
