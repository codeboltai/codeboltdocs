---
name: checkConflicts
description: Checks for potential conflicts in file reservations before reserving.
cbbaseinfo:
  description: Checks for potential conflicts in file reservations before reserving.
data:
  name: checkConflicts
  category: mail
  link: checkConflicts.md
---

# checkConflicts

```text
codebolt.mail.checkConflicts(params: ICheckConflictsParams): Promise<ICheckConflictsResponse>
```

Checks for potential conflicts in file reservations before reserving.

## When to use it

Inspect reservations on intended edit paths before requesting your own reservation.

## Example

### Check whether a file is reserved

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.mail.checkConflicts({
    agentId: 'docs-reviewer-id',
    paths: ['README.md'],
  });
  console.log(result.conflicts ?? []);
});
```
