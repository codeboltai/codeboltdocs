---
title: pushToRemote
---

# `pushToRemote`

```typescript
client.git.pushToRemote(data?: GitPushRequest): Promise<unknown>
```

Pushes committed changes to the remote repository.

Uploads local commits to the configured remote. This is the standard
way to share local changes with the remote repository.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GitPushRequest` | No | Optional push parameters such as branch or force flag |

## Returns

`Promise<unknown>` — A promise that resolves when the push is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.git.pushToRemote();
console.log(result);
```
