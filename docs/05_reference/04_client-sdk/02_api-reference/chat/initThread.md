---
title: initThread
---

# `initThread`

```typescript
client.chat.initThread(data: InitiateNewThreadRequest): Promise<ChatThreadInfo>
```

Initializes a chat thread.

An alias for  that creates or retrieves
a thread based on the provided parameters.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `InitiateNewThreadRequest` | Yes | The thread initiation request |

## Returns

`Promise<ChatThreadInfo>` — A promise that resolves to the ChatThreadInfo

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.chat.initThread(/* InitiateNewThreadRequest */);
console.log(result);
```
