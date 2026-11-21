---
title: cancel
---

# `cancel`

```typescript
client.fileUpdateIntents.cancel(id: string, data?: CancelFileUpdateIntentRequest): Promise<unknown>
```

Cancels a file update intent.

Aborts an in-progress intent and releases any held resources or locks.
Use this when an operation fails or needs to be terminated before
completion.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the intent |
| `data` | `CancelFileUpdateIntentRequest` | No | Optional cancellation parameters |

## Returns

`Promise<unknown>` — A promise that resolves when the intent is cancelled

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.fileUpdateIntents.cancel('id');
console.log(result);
```
