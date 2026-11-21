---
title: createThread
---

# `createThread`

```typescript
client.chat.createThread(data: CreateChatThreadRequest): Promise<ChatThreadInfo>
```

Creates a new chat thread.

Provisions a new thread with the specified configuration, without
the automatic lookup behavior of initiateNewThread.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateChatThreadRequest` | Yes | The thread creation payload |

## Returns

`Promise<ChatThreadInfo>` — A promise that resolves to the newly created ChatThreadInfo

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.chat.createThread(/* CreateChatThreadRequest */);
console.log(result);
```
