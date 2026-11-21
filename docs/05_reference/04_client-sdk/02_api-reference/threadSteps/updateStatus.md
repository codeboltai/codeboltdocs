---
title: updateStatus
---

# `updateStatus`

```typescript
client.threadSteps.updateStatus(stepId: string, data: UpdateStepStatusRequest): Promise<ThreadStep>
```

Update step status

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `stepId` | `string` | Yes |  |
| `data` | `UpdateStepStatusRequest` | Yes |  |

## Returns

`Promise<ThreadStep>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threadSteps.updateStatus('stepId', /* UpdateStepStatusRequest */);
console.log(result);
```
