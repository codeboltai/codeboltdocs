---
title: getMessages
---

# `getMessages`

```typescript
client.inbox.getMessages(params?: InboxMessageListParams): Promise<InboxMessage[]>
```

Retrieves all inbox messages.

Returns the full list of messages in the inbox, including unread,
acknowledged, and unresolved messages. Use optional parameters to
filter by status or paginate results.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `InboxMessageListParams` | No | Optional query and filter parameters |

## Returns

`Promise<InboxMessage[]>` — A promise that resolves to an array of  objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.inbox.getMessages();
console.log(result);
```
