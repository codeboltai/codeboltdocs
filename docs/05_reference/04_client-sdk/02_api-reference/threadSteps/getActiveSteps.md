---
title: getActiveSteps
---

# `getActiveSteps`

```typescript
client.threadSteps.getActiveSteps(threadId: string): Promise<ThreadStep[]>
```

Get active steps for a thread

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

const result = await client.threadSteps.getActiveSteps('threadId');
console.log(result);
```
