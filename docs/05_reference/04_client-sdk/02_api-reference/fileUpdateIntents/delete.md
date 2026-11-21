---
title: delete
---

# `delete`

```typescript
client.fileUpdateIntents.delete(id: string): Promise<unknown>
```

Deletes a file update intent.

Removes the specified intent and releases any file locks it held.
Other agents will then be able to create intents for those files.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the intent to delete |

## Returns

`Promise<unknown>` — A promise that resolves when the intent has been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.fileUpdateIntents.delete('id');
console.log(result);
```
