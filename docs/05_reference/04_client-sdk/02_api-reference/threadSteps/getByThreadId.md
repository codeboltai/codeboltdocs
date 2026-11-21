---
title: getByThreadId
---

# `getByThreadId`

```typescript
client.threadSteps.getByThreadId(threadId: string): Promise<ThreadStep[]>
```

Get steps by thread ID

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes |  |

## Returns

`Promise<ThreadStep[]>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threadSteps.getByThreadId('threadId');
console.log(result);
```
