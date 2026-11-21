---
title: getStatistics
---

# `getStatistics`

```typescript
client.threadSteps.getStatistics(threadId: string): Promise<StepStatistics>
```

Get step statistics for a thread

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes |  |

## Returns

`Promise<StepStatistics>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threadSteps.getStatistics('threadId');
console.log(result);
```
