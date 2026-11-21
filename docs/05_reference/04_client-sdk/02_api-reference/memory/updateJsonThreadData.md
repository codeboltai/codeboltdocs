---
title: updateJsonThreadData
---

# `updateJsonThreadData`

```typescript
client.memory.updateJsonThreadData(threadId: string, data: UpdateJsonDataRequest): Promise<unknown>
```

Replaces the JSON data payload of a thread.

Updates the structured data stored in the JSON thread. This is separate from metadata
updates to allow efficient data-only writes.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the JSON thread |
| `data` | `UpdateJsonDataRequest` | Yes | The new JSON data to store |

## Returns

`Promise<unknown>` — A promise that resolves when the data has been updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.updateJsonThreadData('threadId', /* UpdateJsonDataRequest */);
console.log(result);
```
