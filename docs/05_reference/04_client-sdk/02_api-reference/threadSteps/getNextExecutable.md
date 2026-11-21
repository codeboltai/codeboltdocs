---
title: getNextExecutable
---

# `getNextExecutable`

```typescript
client.threadSteps.getNextExecutable(threadId: string): Promise<ThreadStep | null>
```

Get next executable step for a thread

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes |  |

## Returns

`Promise<ThreadStep | null>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threadSteps.getNextExecutable('threadId');
console.log(result);
```
