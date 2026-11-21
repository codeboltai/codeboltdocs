---
name: listRuns
description: Lists test runs, optionally filtered by suite.
cbbaseinfo:
  description: Lists test runs, optionally filtered by suite.
data:
  name: listRuns
  category: autoTesting
  link: listRuns.md
---

# listRuns

```text
codebolt.autoTesting.listRuns(params?: IListRunsParams): Promise<IListRunsResponse>
```

Lists test runs, optionally filtered by suite.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // List all runs
  const allRuns = await codebolt.autoTesting.listRuns();

  // Filter by suite
  const suiteRuns = await codebolt.autoTesting.listRuns({
    suiteId: 'suite-123'
  });
});
```
