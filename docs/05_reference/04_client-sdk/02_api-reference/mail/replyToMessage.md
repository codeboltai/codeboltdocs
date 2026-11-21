---
title: replyToMessage
---

# `replyToMessage`

```typescript
client.mail.replyToMessage(data: ReplyToMessageRequest): Promise<MailMessage>
```

Sends a reply to an existing message.

Creates a response that is linked to a specific parent message, maintaining the
conversation thread structure. The reply is posted to the same thread as the
original message.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ReplyToMessageRequest` | Yes | The reply payload including the parent message reference and body |

## Returns

`Promise<MailMessage>` — A promise that resolves to the newly created reply message

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mail.replyToMessage(/* ReplyToMessageRequest */);
console.log(result);
```
