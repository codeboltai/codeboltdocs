---
title: getMessages
---

# `getMessages`

```typescript
client.users.getMessages(params?: GetMessagesParams): Promise<unknown[]>
```

Retrieves saved messages from conversation history.

Returns previously saved message history, optionally filtered by agent
or other criteria. Useful for restoring conversation context or
displaying chat history in the UI.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `GetMessagesParams` | No | Optional query parameters for filtering messages |

## Returns

`Promise<unknown[]>` — A promise that resolves to an array of message objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.users.getMessages();
console.log(result);
```
