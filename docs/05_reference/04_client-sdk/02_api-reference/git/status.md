---
title: status
---

# `status`

```typescript
client.git.status(data?: GitStatusRequest): Promise<GitStatus>
```

Retrieves the current Git status of the working directory.

Returns information about staged, unstaged, and untracked files,
similar to running `git status` from the command line.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GitStatusRequest` | No | Optional parameters to scope the status check |

## Returns

`Promise<GitStatus>` — A promise that resolves to the  of the repository

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.git.status();
console.log(result);
```
