---
title: push
---

# `push`

```typescript
client.git.push(data?: GitPushRequest): Promise<unknown>
```

Pushes committed changes to the remote repository.

An alias for  providing a shorter method name.
Both methods perform the same push operation.

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

const result = await client.git.push();
console.log(result);
```
