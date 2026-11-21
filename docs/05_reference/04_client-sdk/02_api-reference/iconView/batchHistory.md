---
title: batchHistory
---

# `batchHistory`

```typescript
client.iconView.batchHistory(data: BatchIconViewHistoryRequest): Promise<Record<string, IconViewHistoryEntry[]>>
```

Retrieves icon view history for multiple threads in a single request.

More efficient than calling  individually for each
thread when you need history for several threads at once.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `BatchIconViewHistoryRequest` | Yes | Request containing the list of thread IDs to fetch history for |

## Returns

`Promise<Record<string, IconViewHistoryEntry[]>>` — A promise that resolves to a record mapping thread IDs to their  arrays

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.iconView.batchHistory(/* BatchIconViewHistoryRequest */);
console.log(result);
```
