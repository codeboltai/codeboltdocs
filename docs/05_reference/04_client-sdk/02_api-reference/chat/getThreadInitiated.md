---
title: getThreadInitiated
---

# `getThreadInitiated`

```typescript
client.chat.getThreadInitiated(threadId: string): Promise<object>
```

Checks whether a thread has been initiated.

Returns a boolean indicating if the thread has gone through the
initiation process and is ready for interaction.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread |

## Returns

`Promise<object>` — A promise that resolves to an object with an `initiated` boolean flag

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.chat.getThreadInitiated('threadId');
console.log(result);
```
