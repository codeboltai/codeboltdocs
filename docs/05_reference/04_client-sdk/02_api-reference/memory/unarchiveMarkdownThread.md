---
title: unarchiveMarkdownThread
---

# `unarchiveMarkdownThread`

```typescript
client.memory.unarchiveMarkdownThread(threadId: string): Promise<unknown>
```

Restores an archived markdown thread back to active status.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the markdown thread to unarchive |

## Returns

`Promise<unknown>` — A promise that resolves when the thread has been unarchived

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.unarchiveMarkdownThread('threadId');
console.log(result);
```
