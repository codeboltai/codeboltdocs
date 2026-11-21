---
title: createThreadMessage
---

# `createThreadMessage`

```typescript
client.mail.createThreadMessage(threadId: string, data: SendMailMessageRequest): Promise<MailMessage>
```

Adds a new message to an existing mail thread.

Posts a message to the specified thread, making it visible to all thread participants.
This is the primary way agents communicate within an established conversation.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to post to |
| `data` | `SendMailMessageRequest` | Yes | The message payload including body and optional metadata |

## Returns

`Promise<MailMessage>` — A promise that resolves to the newly created message

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mail.createThreadMessage('threadId', /* SendMailMessageRequest */);
console.log(result);
```
