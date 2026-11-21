---
title: updateMarkdownThread
---

# `updateMarkdownThread`

```typescript
client.memory.updateMarkdownThread(threadId: string, data: UpdateMarkdownThreadRequest): Promise<MemoryThread>
```

Updates the metadata of a markdown thread (name, tags, etc.).

Modifies thread-level properties without changing the markdown content itself.
Use  to change the actual markdown text.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the markdown thread to update |
| `data` | `UpdateMarkdownThreadRequest` | Yes | The metadata fields to update |

## Returns

`Promise<MemoryThread>` — A promise that resolves to the updated markdown thread

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.updateMarkdownThread('threadId', /* UpdateMarkdownThreadRequest */);
console.log(result);
```
