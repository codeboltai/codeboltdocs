---
title: delete
---

# `delete`

```typescript
client.reviewMerge.delete(id: string): Promise<unknown>
```

Deletes a review-merge request.

Permanently removes a review-merge request and all associated data. This action
cannot be undone.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request to delete |

## Returns

`Promise<unknown>` — A promise that resolves when the deletion is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.reviewMerge.delete('id');
console.log(result);
```
