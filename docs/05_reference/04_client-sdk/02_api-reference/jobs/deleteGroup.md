---
title: deleteGroup
---

# `deleteGroup`

```typescript
client.jobs.deleteGroup(id: string): Promise<void>
```

Deletes a job group.

Removes the group. Jobs previously assigned to this group are not
deleted but lose their group association.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the group to delete |

## Returns

`Promise<void>` — A promise that resolves when deletion is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.jobs.deleteGroup('id');
console.log(result);
```
