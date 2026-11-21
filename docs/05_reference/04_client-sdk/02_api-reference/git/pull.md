---
title: pull
---

# `pull`

```typescript
client.git.pull(data?: GitPullRequest): Promise<unknown>
```

Pulls changes from the remote repository.

Downloads and integrates remote changes into the current branch.
Equivalent to running `git pull` from the command line.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GitPullRequest` | No | Optional pull parameters such as remote name or branch |

## Returns

`Promise<unknown>` — A promise that resolves when the pull is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.git.pull();
console.log(result);
```
