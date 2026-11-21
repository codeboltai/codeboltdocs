---
title: skip
---

# `skip`

```typescript
client.threadSteps.skip(stepId: string, data?: SkipStepRequest): Promise<ThreadStep>
```

Skip a step

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `stepId` | `string` | Yes |  |
| `data` | `SkipStepRequest` | No |  |

## Returns

`Promise<ThreadStep>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threadSteps.skip('stepId');
console.log(result);
```
