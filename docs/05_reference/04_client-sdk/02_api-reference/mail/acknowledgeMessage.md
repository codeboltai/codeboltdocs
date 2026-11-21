---
title: acknowledgeMessage
---

# `acknowledgeMessage`

```typescript
client.mail.acknowledgeMessage(messageId: string): Promise<void>
```

Acknowledges receipt and processing of a message.

Signals that the receiving agent has processed the message content and taken
any required action. This is distinct from marking as read and indicates explicit
acknowledgment of the message's intent.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `messageId` | `string` | Yes | The unique identifier of the message to acknowledge |

## Returns

`Promise<void>` — A promise that resolves when the acknowledgment has been recorded

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mail.acknowledgeMessage('messageId');
console.log(result);
```
