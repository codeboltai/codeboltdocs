---
title: revertUntracked
---

# `revertUntracked`

```typescript
client.git.revertUntracked(data: GitRevertRequest): Promise<unknown>
```

Removes untracked files from the working directory.

Deletes files that are not tracked by Git (i.e., new files that
have not been staged or committed). Use with caution as this
operation cannot be undone.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GitRevertRequest` | Yes | Request specifying which untracked files to remove |

## Returns

`Promise<unknown>` — A promise that resolves when the untracked files have been removed

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.git.revertUntracked(/* GitRevertRequest */);
console.log(result);
```
