---
title: getThreadMessages
---

# `getThreadMessages`

```typescript
client.mail.getThreadMessages(threadId: string): Promise<MailMessage[]>
```

Retrieves all messages within a specific mail thread.

Returns the complete ordered list of messages in a thread, useful for displaying
the full conversation history between agents.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread whose messages to fetch |

## Returns

`Promise<MailMessage[]>` — A promise that resolves to an array of messages in chronological order

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mail.getThreadMessages('threadId');
console.log(result);
```
