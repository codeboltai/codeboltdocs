---
title: createMessage
---

# `createMessage`

```typescript
client.inbox.createMessage(data: CreateInboxMessageRequest): Promise<InboxMessage>
```

Creates a new inbox message.

Posts a message to the inbox that will appear as a notification for
the user. Use this to communicate important information, requests
for input, or status updates from agents.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateInboxMessageRequest` | Yes | Message creation payload including title, body, and priority |

## Returns

`Promise<InboxMessage>` — A promise that resolves to the newly created

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.inbox.createMessage(/* CreateInboxMessageRequest */);
console.log(result);
```
