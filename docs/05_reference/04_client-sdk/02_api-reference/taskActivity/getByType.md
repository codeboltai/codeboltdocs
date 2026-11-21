---
title: getByType
---

# `getByType`

```typescript
client.taskActivity.getByType(type: string): Promise<TaskActivity[]>
```

Get activities by type

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `type` | `string` | Yes |  |

## Returns

`Promise<TaskActivity[]>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.taskActivity.getByType('type');
console.log(result);
```
