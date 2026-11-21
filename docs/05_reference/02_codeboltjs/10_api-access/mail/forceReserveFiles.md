---
name: forceReserveFiles
description: Forcefully reserves files, overriding existing reservations.
cbbaseinfo:
  description: Forcefully reserves files, overriding existing reservations.
data:
  name: forceReserveFiles
  category: mail
  link: forceReserveFiles.md
---

# forceReserveFiles

```text
codebolt.mail.forceReserveFiles(params: IForceReserveFilesParams): Promise<IForceReserveFilesResponse>
```

Forcefully reserves files, overriding existing reservations.

## When to use it

Take over a reservation when the workflow has coordinated the handoff. Include a reason for the override.

## Example

### Take over a reservation after coordinating with the owner

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.mail.forceReserveFiles({
    agentId: 'docs-reviewer-id',
    paths: ['README.md'],
    reason: 'The previous owner handed off the README update.',
    ttlSeconds: 120,
  });
  console.log(result.reservationId, result.overridden);
});
```
