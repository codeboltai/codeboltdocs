---
title: list
---

# `list`

```typescript
client.threadSteps.list(params?: StepListParams): Promise<ThreadStep[]>
```

List all steps

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `StepListParams` | No |  |

## Returns

`Promise<ThreadStep[]>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threadSteps.list();
console.log(result);
```
