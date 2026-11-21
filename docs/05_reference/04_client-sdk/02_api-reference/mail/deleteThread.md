---
title: deleteThread
---

# `deleteThread`

```typescript
client.mail.deleteThread(threadId: string): Promise<void>
```

Permanently deletes a mail thread and all its messages.

Removes the thread and its entire message history. This action cannot be undone.
Consider archiving threads instead if you may need to reference them later.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to delete |

## Returns

`Promise<void>` — A promise that resolves when the thread has been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mail.deleteThread('threadId');
console.log(result);
```
