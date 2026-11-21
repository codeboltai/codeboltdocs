---
title: getStats
---

# `getStats`

```typescript
client.todos.getStats(params?: TodoListParams): Promise<TodoStats>
```

Retrieves todo statistics, optionally filtered by thread.

Returns aggregated statistics about todos including counts by status,
priority distribution, and completion rates. When a threadId is provided,
statistics are scoped to that specific thread only.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `TodoListParams` | No | Optional query parameters for filtering statistics |

## Returns

`Promise<TodoStats>` — A promise that resolves to TodoStats object with metrics

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.todos.getStats();
console.log(result);
```
