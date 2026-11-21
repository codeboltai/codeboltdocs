---
title: send
---

# `send`

```typescript
client.mail.send(data: SendMailMessageRequest): Promise<MailMessage>
```

Sends a new standalone mail message.

Delivers a message directly without requiring an existing thread. This is useful for
one-off notifications or messages that do not belong to an ongoing conversation.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `SendMailMessageRequest` | Yes | The message payload |

## Returns

`Promise<MailMessage>` — A promise that resolves to the sent message

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mail.send(/* SendMailMessageRequest */);
console.log(result);
```
