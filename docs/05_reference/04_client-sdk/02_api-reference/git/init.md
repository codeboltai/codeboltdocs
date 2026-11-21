---
title: init
---

# `init`

```typescript
client.git.init(data?: GitInitRequest): Promise<unknown>
```

Initializes a new Git repository in the workspace.

Creates a new `.git` directory and sets up the repository. If the
repository already exists, behavior depends on the server configuration.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GitInitRequest` | No | Optional initialization parameters such as default branch name |

## Returns

`Promise<unknown>` — A promise that resolves when initialization is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.git.init();
console.log(result);
```
