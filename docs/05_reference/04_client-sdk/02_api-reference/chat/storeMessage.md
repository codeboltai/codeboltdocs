---
title: storeMessage
---

# `storeMessage`

```typescript
client.chat.storeMessage(data: StoreMessageRequest): Promise<ChatMessage>
```

Stores a new message in a chat thread.

Persists a message to the thread's message history, recording
who sent it and its content.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `StoreMessageRequest` | Yes | The message storage payload |

## Returns

`Promise<ChatMessage>` — A promise that resolves to the stored ChatMessage

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.chat.storeMessage(/* StoreMessageRequest */);
console.log(result);
```
