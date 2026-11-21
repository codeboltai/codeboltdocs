---
title: publishRemote
---

# `publishRemote`

```typescript
client.git.publishRemote(data: GitPublishRemoteRequest): Promise<unknown>
```

Publishes the local repository to a new remote.

Sets up a remote and pushes the local repository to it for the first
time. Use this when the repository does not yet have a remote configured.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GitPublishRemoteRequest` | Yes | Remote publication parameters including the target URL |

## Returns

`Promise<unknown>` — A promise that resolves when publishing is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.git.publishRemote(/* GitPublishRemoteRequest */);
console.log(result);
```
