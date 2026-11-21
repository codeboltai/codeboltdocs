---
title: updateThread
---

# `updateThread`

```typescript
client.mail.updateThread(threadId: string, data: UpdateMailThreadRequest): Promise<MailThread>
```

Partially updates a mail thread's metadata.

Applies a partial update (PATCH) to the thread, allowing you to modify specific fields
such as the subject, status, or participants without affecting other properties.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to update |
| `data` | `UpdateMailThreadRequest` | Yes | The fields to patch on the thread |

## Returns

`Promise<MailThread>` — A promise that resolves to the updated mail thread

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mail.updateThread('threadId', /* UpdateMailThreadRequest */);
console.log(result);
```
