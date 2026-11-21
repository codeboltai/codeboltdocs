---
title: fail
---

# `fail`

```typescript
client.threadSteps.fail(stepId: string, data?: FailStepRequest): Promise<ThreadStep>
```

Mark a step as failed

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `stepId` | `string` | Yes |  |
| `data` | `FailStepRequest` | No |  |

## Returns

`Promise<ThreadStep>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threadSteps.fail('stepId');
console.log(result);
```
