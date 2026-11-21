---
title: search
---

# `search`

```typescript
client.tasks.search(params?: TaskSearchParams): Promise<Task[]>
```

Searches for tasks using optional query parameters.

Returns tasks that match the specified search criteria. Use this method
to find tasks by various attributes including status, priority, date
ranges, or custom filters. Returns an empty array if no tasks match.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `TaskSearchParams` | No | Optional search parameters for filtering and sorting tasks |

## Returns

`Promise<Task[]>` — A promise that resolves to an array of matching Task objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.tasks.search();
console.log(result);
```
