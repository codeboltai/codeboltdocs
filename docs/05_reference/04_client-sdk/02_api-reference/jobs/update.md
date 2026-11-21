---
title: update
---

# `update`

```typescript
client.jobs.update(id: string, data: UpdateJobRequest): Promise<Job>
```

Updates an existing job.

Modifies job properties such as title, description, status, or
assignee. Only the fields provided in the request body are updated.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the job to update |
| `data` | `UpdateJobRequest` | Yes | The fields to update |

## Returns

`Promise<Job>` — A promise that resolves to the updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.jobs.update('id', /* UpdateJobRequest */);
console.log(result);
```
