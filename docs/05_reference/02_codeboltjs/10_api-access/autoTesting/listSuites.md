---
name: listSuites
description: Lists all available test suites.
cbbaseinfo:
  description: Lists all available test suites.
data:
  name: listSuites
  category: autoTesting
  link: listSuites.md
---

# listSuites

```text
codebolt.autoTesting.listSuites(_params?: IListSuitesParams): Promise<IListSuitesResponse>
```

Lists all available test suites.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const suites = await codebolt.autoTesting.listSuites();
  console.log('Available suites:', suites.payload.suites);
});
```
