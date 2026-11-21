---
title: get
---

# `get`

```typescript
client.taskActivity.get(taskId: string): Promise<TaskActivity>
```

Get a specific task activity

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `taskId` | `string` | Yes |  |

## Returns

`Promise<TaskActivity>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.taskActivity.get('taskId');
console.log(result);
```
