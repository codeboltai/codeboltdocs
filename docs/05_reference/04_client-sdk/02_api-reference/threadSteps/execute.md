---
title: execute
---

# `execute`

```typescript
client.threadSteps.execute(stepId: string, data?: ExecuteStepRequest): Promise<ThreadStep>
```

Execute a step

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `stepId` | `string` | Yes |  |
| `data` | `ExecuteStepRequest` | No |  |

## Returns

`Promise<ThreadStep>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threadSteps.execute('stepId');
console.log(result);
```
