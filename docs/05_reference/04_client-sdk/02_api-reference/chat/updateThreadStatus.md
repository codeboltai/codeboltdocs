---
title: updateThreadStatus
---

# `updateThreadStatus`

```typescript
client.chat.updateThreadStatus(data: UpdateChatThreadStatusRequest): Promise<void>
```

Updates the status of a chat thread.

Changes the thread's status (e.g., active, paused, completed),
which affects how it is displayed and processed.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UpdateChatThreadStatusRequest` | Yes | The status update payload |

## Returns

`Promise<void>` — A promise that resolves when the status has been updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.chat.updateThreadStatus(/* UpdateChatThreadStatusRequest */);
console.log(result);
```
