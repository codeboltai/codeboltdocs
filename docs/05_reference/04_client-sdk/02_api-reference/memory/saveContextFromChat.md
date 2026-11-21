---
title: saveContextFromChat
---

# `saveContextFromChat`

```typescript
client.memory.saveContextFromChat(threadId: string, data: SaveContextFromChatRequest): Promise<unknown>
```

Saves context extracted from a chat conversation into a context thread.

Captures relevant information, decisions, and knowledge from an ongoing or completed
chat session and persists it in the specified context thread for future reference.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the context thread to save into |
| `data` | `SaveContextFromChatRequest` | Yes | The chat context extraction payload |

## Returns

`Promise<unknown>` — A promise that resolves when the context has been saved

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.saveContextFromChat('threadId', /* SaveContextFromChatRequest */);
console.log(result);
```
