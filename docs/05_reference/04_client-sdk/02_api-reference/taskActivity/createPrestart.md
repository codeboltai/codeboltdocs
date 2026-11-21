---
title: createPrestart
---

# `createPrestart`

```typescript
client.taskActivity.createPrestart(data: CreatePrestartActivityRequest): Promise<TaskActivity>
```

Create a prestart activity

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreatePrestartActivityRequest` | Yes |  |

## Returns

`Promise<TaskActivity>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.taskActivity.createPrestart(/* CreatePrestartActivityRequest */);
console.log(result);
```
