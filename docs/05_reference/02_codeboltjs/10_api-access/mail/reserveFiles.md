---
name: reserveFiles
description: Reserves files for exclusive access during collaborative work.
cbbaseinfo:
  description: Reserves files for exclusive access during collaborative work.
data:
  name: reserveFiles
  category: mail
  link: reserveFiles.md
---

# reserveFiles

```text
codebolt.mail.reserveFiles(params: IReserveFilesParams): Promise<IReserveFilesResponse>
```

Reserves files for exclusive access during collaborative work.

## When to use it

Declare an editing reservation with a reason and lifetime so cooperating agents can check for conflicts.

## Example

### Reserve a file before making changes

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.mail.reserveFiles({
    agentId: 'docs-reviewer-id',
    paths: ['README.md'],
    exclusive: true,
    ttlSeconds: 120,
    reason: 'Update the README overview',
  });
  console.log('Reserved', result.reserved);
});
```
