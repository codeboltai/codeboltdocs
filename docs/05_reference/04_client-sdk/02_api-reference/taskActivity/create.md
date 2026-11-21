---
title: create
---

# `create`

```typescript
client.taskActivity.create(data: CreateTaskActivityRequest): Promise<TaskActivity>
```

Create a new task activity

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateTaskActivityRequest` | Yes |  |

## Returns

`Promise<TaskActivity>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.taskActivity.create(/* CreateTaskActivityRequest */);
console.log(result);
```
