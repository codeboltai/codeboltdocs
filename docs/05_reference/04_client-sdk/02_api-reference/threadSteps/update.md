---
title: update
---

# `update`

```typescript
client.threadSteps.update(stepId: string, data: UpdateStepRequest): Promise<ThreadStep>
```

Update a step

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `stepId` | `string` | Yes |  |
| `data` | `UpdateStepRequest` | Yes |  |

## Returns

`Promise<ThreadStep>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threadSteps.update('stepId', /* UpdateStepRequest */);
console.log(result);
```
