---
title: complete
---

# `complete`

```typescript
client.fileUpdateIntents.complete(id: string, data?: CompleteFileUpdateIntentRequest): Promise<unknown>
```

Marks a file update intent as complete.

Finalizes an intent after all file modifications are finished.
This releases locks and records the successful completion of
the update operation.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the intent |
| `data` | `CompleteFileUpdateIntentRequest` | No | Optional completion parameters |

## Returns

`Promise<unknown>` — A promise that resolves when the intent is marked complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.fileUpdateIntents.complete('id');
console.log(result);
```
