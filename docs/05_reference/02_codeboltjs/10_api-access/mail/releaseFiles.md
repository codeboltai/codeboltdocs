---
name: releaseFiles
description: Releases file reservations after collaborative work is complete.
cbbaseinfo:
  description: Releases file reservations after collaborative work is complete.
data:
  name: releaseFiles
  category: mail
  link: releaseFiles.md
---

# releaseFiles

```text
codebolt.mail.releaseFiles(params: IReleaseFilesParams): Promise<IReleaseFilesResponse>
```

Releases file reservations after collaborative work is complete.

## When to use it

Release reservations on paths you have finished editing so another agent can claim them.

## Example

### Release a file reservation

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.mail.releaseFiles({
    agentId: 'docs-reviewer-id',
    paths: ['README.md'],
  });
  console.log('Released', result.released);
});
```
