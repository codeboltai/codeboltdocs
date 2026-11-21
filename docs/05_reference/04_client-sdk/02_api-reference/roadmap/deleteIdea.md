---
title: deleteIdea
---

# `deleteIdea`

```typescript
client.roadmap.deleteIdea(ideaId: string): Promise<unknown>
```

Deletes an idea from the roadmap idea pool.

Permanently removes an idea. This action cannot be undone.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `ideaId` | `string` | Yes | The unique identifier of the idea to delete |

## Returns

`Promise<unknown>` — A promise that resolves when the idea has been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.roadmap.deleteIdea('ideaId');
console.log(result);
```
