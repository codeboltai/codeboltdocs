---
title: complete
---

# `complete`

```typescript
client.threadSteps.complete(stepId: string, data?: CompleteStepRequest): Promise<ThreadStep>
```

Complete a step

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `stepId` | `string` | Yes |  |
| `data` | `CompleteStepRequest` | No |  |

## Returns

`Promise<ThreadStep>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threadSteps.complete('stepId');
console.log(result);
```
