---
title: archiveMarkdownThread
---

# `archiveMarkdownThread`

```typescript
client.memory.archiveMarkdownThread(threadId: string): Promise<unknown>
```

Archives a markdown thread to remove it from active listings.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the markdown thread to archive |

## Returns

`Promise<unknown>` — A promise that resolves when the thread has been archived

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.archiveMarkdownThread('threadId');
console.log(result);
```
