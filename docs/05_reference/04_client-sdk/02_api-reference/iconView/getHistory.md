---
title: getHistory
---

# `getHistory`

```typescript
client.iconView.getHistory(threadId: string): Promise<IconViewHistoryEntry[]>
```

Retrieves the icon view history for a specific conversation thread.

Returns a chronologically ordered list of history entries representing
the actions and messages that occurred within the thread.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the conversation thread |

## Returns

`Promise<IconViewHistoryEntry[]>` — A promise that resolves to an array of  objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.iconView.getHistory('threadId');
console.log(result);
```
