---
title: createBranch
---

# `createBranch`

```typescript
client.git.createBranch(data: GitCreateBranchRequest): Promise<unknown>
```

Creates a new Git branch.

Creates a branch with the specified name, optionally based on a
given starting point (commit, tag, or another branch).

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GitCreateBranchRequest` | Yes | Branch creation parameters including the new branch name |

## Returns

`Promise<unknown>` — A promise that resolves when the branch has been created

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.git.createBranch(/* GitCreateBranchRequest */);
console.log(result);
```
