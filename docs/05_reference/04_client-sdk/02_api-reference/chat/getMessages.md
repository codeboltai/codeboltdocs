---
title: getMessages
---

# `getMessages`

```typescript
client.chat.getMessages(threadId: string): Promise<ChatMessage[]>
```

Retrieves all messages for a specific thread.

Returns the complete message history for the given thread,
ordered chronologically.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread |

## Returns

`Promise<ChatMessage[]>` — A promise that resolves to an array of ChatMessage objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.chat.getMessages('threadId');
console.log(result);
```
