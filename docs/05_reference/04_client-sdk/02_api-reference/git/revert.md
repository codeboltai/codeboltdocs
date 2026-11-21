---
title: revert
---

# `revert`

```typescript
client.git.revert(data: GitRevertRequest): Promise<unknown>
```

Reverts changes to tracked files in the working directory.

Discards uncommitted modifications to files that are already tracked
by Git, restoring them to their last committed state.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GitRevertRequest` | Yes | Request specifying which files to revert |

## Returns

`Promise<unknown>` — A promise that resolves when the revert is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.git.revert(/* GitRevertRequest */);
console.log(result);
```
