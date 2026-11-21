---
title: getDetailsWithActivities
---

# `getDetailsWithActivities`

```typescript
client.taskActivity.getDetailsWithActivities(taskId: string): Promise<TaskDetailsWithActivities>
```

Get task details with activities

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `taskId` | `string` | Yes |  |

## Returns

`Promise<TaskDetailsWithActivities>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.taskActivity.getDetailsWithActivities('taskId');
console.log(result);
```
