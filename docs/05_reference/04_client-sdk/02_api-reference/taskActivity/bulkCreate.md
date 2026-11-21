---
title: bulkCreate
---

# `bulkCreate`

```typescript
client.taskActivity.bulkCreate(data: CreateTaskActivityRequest[]): Promise<TaskActivity[]>
```

Bulk create activities

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateTaskActivityRequest[]` | Yes |  |

## Returns

`Promise<TaskActivity[]>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.taskActivity.bulkCreate(/* CreateTaskActivityRequest[] */);
console.log(result);
```
