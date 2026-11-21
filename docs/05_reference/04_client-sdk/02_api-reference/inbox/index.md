---
title: Inbox API
---

# Inbox API

Inbox API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`acknowledge`](./acknowledge) | Acknowledges an inbox message. |
| [`clearResolved`](./clearResolved) | Clears all resolved inbox messages. |
| [`createMessage`](./createMessage) | Creates a new inbox message. |
| [`getMessages`](./getMessages) | Retrieves all inbox messages. |
| [`resolve`](./resolve) | Resolves an inbox message. |

## Methods

---

### `acknowledge`

```typescript
client.inbox.acknowledge(messageId: string): Promise<void>
```

Acknowledges an inbox message.

Marks a message as seen/acknowledged without resolving it. This
indicates the user is aware of the message but may not have acted
on it yet.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `messageId` | `string` | Yes | The unique identifier of the message to acknowledge |

**Returns:** `Promise<void>` — A promise that resolves when the message has been acknowledged

[Full reference →](./acknowledge)

---

### `clearResolved`

```typescript
client.inbox.clearResolved(): Promise<void>
```

Clears all resolved inbox messages.

Removes messages that have been marked as resolved, cleaning up the
inbox. Unresolved and acknowledged messages are not affected.

_No parameters._

**Returns:** `Promise<void>` — A promise that resolves when the resolved messages have been cleared

[Full reference →](./clearResolved)

---

### `createMessage`

```typescript
client.inbox.createMessage(data: CreateInboxMessageRequest): Promise<InboxMessage>
```

Creates a new inbox message.

Posts a message to the inbox that will appear as a notification for
the user. Use this to communicate important information, requests
for input, or status updates from agents.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateInboxMessageRequest` | Yes | Message creation payload including title, body, and priority |

**Returns:** `Promise<InboxMessage>` — A promise that resolves to the newly created

[Full reference →](./createMessage)

---

### `getMessages`

```typescript
client.inbox.getMessages(params?: InboxMessageListParams): Promise<InboxMessage[]>
```

Retrieves all inbox messages.

Returns the full list of messages in the inbox, including unread,
acknowledged, and unresolved messages. Use optional parameters to
filter by status or paginate results.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `InboxMessageListParams` | No | Optional query and filter parameters |

**Returns:** `Promise<InboxMessage[]>` — A promise that resolves to an array of  objects

[Full reference →](./getMessages)

---

### `resolve`

```typescript
client.inbox.resolve(messageId: string): Promise<void>
```

Resolves an inbox message.

Marks a message as fully resolved, indicating the user has addressed
it. Resolved messages can later be cleared with .

| Parameter | Type | Required | Description |
|---|---|---|---|
| `messageId` | `string` | Yes | The unique identifier of the message to resolve |

**Returns:** `Promise<void>` — A promise that resolves when the message has been resolved

[Full reference →](./resolve)

