---
title: diff
---

# `diff`

```typescript
client.git.diff(data?: GitDiffRequest): Promise<GitDiff[]>
```

Retrieves the current diff of changes in the working directory.

Compares the working tree against the latest commit to show all
unstaged modifications. Optionally filters to a specific file path.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GitDiffRequest` | No | Optional filter parameters |

## Returns

`Promise<GitDiff[]>` — A promise that resolves to an array of  objects with file changes and line modifications

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.git.diff();
console.log(result);
```
