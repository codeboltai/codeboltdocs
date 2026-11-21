---
title: delete
---

# `delete`

```typescript
client.jobs.delete(id: string): Promise<void>
```

Deletes a job.

Permanently removes a job and its associated data. Dependencies
pointing to this job are also cleaned up.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the job to delete |

## Returns

`Promise<void>` — A promise that resolves when deletion is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.jobs.delete('id');
console.log(result);
```
