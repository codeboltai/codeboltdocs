---
title: commit
---

# `commit`

```typescript
client.git.commit(data: GitCommitRequest): Promise<unknown>
```

Creates a new Git commit with the staged changes.

Commits all currently staged files with the provided commit message
and optional author information.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GitCommitRequest` | Yes | Commit parameters including the commit message |

## Returns

`Promise<unknown>` — A promise that resolves when the commit is created

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.git.commit(/* GitCommitRequest */);
console.log(result);
```
