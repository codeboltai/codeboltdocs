---
title: branch
---

# `branch`

```typescript
client.git.branch(data?: GitBranchRequest): Promise<GitBranch[]>
```

Lists branches in the repository.

Returns all local (and optionally remote) branches with their
metadata. Useful for branch selection UIs and workflow logic.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GitBranchRequest` | No | Optional parameters to filter branches (e.g., local-only, remote) |

## Returns

`Promise<GitBranch[]>` — A promise that resolves to an array of  objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.git.branch();
console.log(result);
```
