---
title: acknowledge
---

# `acknowledge`

```typescript
client.inbox.acknowledge(messageId: string): Promise<void>
```

Acknowledges an inbox message.

Marks a message as seen/acknowledged without resolving it. This
indicates the user is aware of the message but may not have acted
on it yet.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `messageId` | `string` | Yes | The unique identifier of the message to acknowledge |

## Returns

`Promise<void>` — A promise that resolves when the message has been acknowledged

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.inbox.acknowledge('messageId');
console.log(result);
```
