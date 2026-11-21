---
title: resolve
---

# `resolve`

```typescript
client.inbox.resolve(messageId: string): Promise<void>
```

Resolves an inbox message.

Marks a message as fully resolved, indicating the user has addressed
it. Resolved messages can later be cleared with .

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `messageId` | `string` | Yes | The unique identifier of the message to resolve |

## Returns

`Promise<void>` — A promise that resolves when the message has been resolved

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.inbox.resolve('messageId');
console.log(result);
```
