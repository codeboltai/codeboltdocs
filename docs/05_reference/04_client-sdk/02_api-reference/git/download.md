---
title: download
---

# `download`

```typescript
client.git.download(data: GitDownloadRequest): Promise<unknown>
```

Downloads (clones) a remote Git repository.

Clones a repository from a URL into the workspace. Use this to
set up a project from an existing remote repository.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GitDownloadRequest` | Yes | Clone parameters including the repository URL |

## Returns

`Promise<unknown>` — A promise that resolves when the download/clone is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.git.download(/* GitDownloadRequest */);
console.log(result);
```
