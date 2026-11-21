---
title: updateGroup
---

# `updateGroup`

```typescript
client.jobs.updateGroup(id: string, data: UpdateJobGroupRequest): Promise<JobGroup>
```

Updates an existing job group.

Modifies group properties such as name, description, or metadata.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the group to update |
| `data` | `UpdateJobGroupRequest` | Yes | The fields to update on the group |

## Returns

`Promise<JobGroup>` — A promise that resolves to the updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.jobs.updateGroup('id', /* UpdateJobGroupRequest */);
console.log(result);
```
