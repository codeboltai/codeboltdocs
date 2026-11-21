---
title: archiveThread
---

# `archiveThread`

```typescript
client.memory.archiveThread(threadId: string): Promise<unknown>
```

Archives a generic memory thread to remove it from active listings.

Moves the thread to an archived state where it is preserved but hidden from default
queries. Archived threads can be restored later.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to archive |

## Returns

`Promise<unknown>` — A promise that resolves when the thread has been archived

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.archiveThread('threadId');
console.log(result);
```
