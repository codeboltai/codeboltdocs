---
title: initiateNewThread
---

# `initiateNewThread`

```typescript
client.chat.initiateNewThread(data: InitiateNewThreadRequest): Promise<ChatThreadInfo>
```

Initiates a new chat thread or retrieves an existing one.

Creates a new thread if one doesn't exist for the given context,
or returns the existing thread. This is the primary entry point
for starting a conversation.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `InitiateNewThreadRequest` | Yes | The thread initiation request |

## Returns

`Promise<ChatThreadInfo>` — A promise that resolves to the ChatThreadInfo for the new or existing thread

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.chat.initiateNewThread(/* InitiateNewThreadRequest */);
console.log(result);
```
