---
title: getByStatus
---

# `getByStatus`

```typescript
client.taskActivity.getByStatus(status: string): Promise<TaskActivity[]>
```

Get activities by status

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `status` | `string` | Yes |  |

## Returns

`Promise<TaskActivity[]>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.taskActivity.getByStatus('status');
console.log(result);
```
