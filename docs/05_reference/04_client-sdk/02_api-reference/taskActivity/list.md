---
title: list
---

# `list`

```typescript
client.taskActivity.list(params?: TaskActivityListParams): Promise<TaskActivity[]>
```

List all task activities

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `TaskActivityListParams` | No |  |

## Returns

`Promise<TaskActivity[]>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.taskActivity.list();
console.log(result);
```
