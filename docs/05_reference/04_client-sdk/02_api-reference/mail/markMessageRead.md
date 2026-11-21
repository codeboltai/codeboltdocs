---
title: markMessageRead
---

# `markMessageRead`

```typescript
client.mail.markMessageRead(messageId: string): Promise<void>
```

Marks a specific message as read by the current agent.

Updates the read status of a message, which can be used to track which messages
have been processed by each agent in a conversation.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `messageId` | `string` | Yes | The unique identifier of the message to mark as read |

## Returns

`Promise<void>` — A promise that resolves when the read status has been updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mail.markMessageRead('messageId');
console.log(result);
```
