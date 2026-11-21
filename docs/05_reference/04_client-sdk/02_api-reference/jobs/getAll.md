---
title: getAll
---

# `getAll`

```typescript
client.jobs.getAll(params?: JobListFilters): Promise<Job[]>
```

Lists all jobs, optionally filtered.

Returns every job in the system unless filter parameters are provided
to narrow the results by status, group, label, or other criteria.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `JobListFilters` | No | Optional filter and pagination parameters |

## Returns

`Promise<Job[]>` — A promise that resolves to an array of  objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.jobs.getAll();
console.log(result);
```
