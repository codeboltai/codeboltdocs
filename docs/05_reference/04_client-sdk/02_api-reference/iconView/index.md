---
title: IconView API
---

# IconView API

Icon View API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`batchHistory`](./batchHistory) | Retrieves icon view history for multiple threads in a single request. |
| [`getHistory`](./getHistory) | Retrieves the icon view history for a specific conversation thread. |
| [`getMessage`](./getMessage) | Retrieves a specific message from a conversation thread's icon view. |

## Methods

---

### `batchHistory`

```typescript
client.iconView.batchHistory(data: BatchIconViewHistoryRequest): Promise<Record<string, IconViewHistoryEntry[]>>
```

Retrieves icon view history for multiple threads in a single request.

More efficient than calling  individually for each
thread when you need history for several threads at once.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `BatchIconViewHistoryRequest` | Yes | Request containing the list of thread IDs to fetch history for |

**Returns:** `Promise<Record<string, IconViewHistoryEntry[]>>` — A promise that resolves to a record mapping thread IDs to their  arrays

[Full reference →](./batchHistory)

---

### `getHistory`

```typescript
client.iconView.getHistory(threadId: string): Promise<IconViewHistoryEntry[]>
```

Retrieves the icon view history for a specific conversation thread.

Returns a chronologically ordered list of history entries representing
the actions and messages that occurred within the thread.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the conversation thread |

**Returns:** `Promise<IconViewHistoryEntry[]>` — A promise that resolves to an array of  objects

[Full reference →](./getHistory)

---

### `getMessage`

```typescript
client.iconView.getMessage(threadId: string, messageId: string): Promise<IconViewMessage>
```

Retrieves a specific message from a conversation thread's icon view.

Returns the full details of a single message including its content,
metadata, and any associated icon view display information.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the conversation thread |
| `messageId` | `string` | Yes | The unique identifier of the message within the thread |

**Returns:** `Promise<IconViewMessage>` — A promise that resolves to the

[Full reference →](./getMessage)

