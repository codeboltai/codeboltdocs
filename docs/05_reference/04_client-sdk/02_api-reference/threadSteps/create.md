---
title: create
---

# `create`

```typescript
client.threadSteps.create(data: CreateStepRequest): Promise<ThreadStep>
```

Create a new step

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateStepRequest` | Yes |  |

## Returns

`Promise<ThreadStep>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threadSteps.create(/* CreateStepRequest */);
console.log(result);
```
