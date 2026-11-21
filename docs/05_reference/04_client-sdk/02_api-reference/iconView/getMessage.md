---
title: getMessage
---

# `getMessage`

```typescript
client.iconView.getMessage(threadId: string, messageId: string): Promise<IconViewMessage>
```

Retrieves a specific message from a conversation thread's icon view.

Returns the full details of a single message including its content,
metadata, and any associated icon view display information.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the conversation thread |
| `messageId` | `string` | Yes | The unique identifier of the message within the thread |

## Returns

`Promise<IconViewMessage>` — A promise that resolves to the

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.iconView.getMessage('threadId', 'messageId');
console.log(result);
```
