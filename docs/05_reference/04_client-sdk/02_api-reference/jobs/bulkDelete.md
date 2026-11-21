---
title: bulkDelete
---

# `bulkDelete`

```typescript
client.jobs.bulkDelete(data: BulkDeleteJobsRequest): Promise<void>
```

Deletes multiple jobs in a single batch operation.

More efficient than deleting jobs one at a time when you need to
remove several jobs simultaneously.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `BulkDeleteJobsRequest` | Yes | Payload containing the array of job IDs to delete |

## Returns

`Promise<void>` — A promise that resolves when all specified jobs have been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.jobs.bulkDelete(/* BulkDeleteJobsRequest */);
console.log(result);
```
