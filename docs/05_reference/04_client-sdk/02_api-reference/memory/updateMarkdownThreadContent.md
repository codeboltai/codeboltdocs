---
title: updateMarkdownThreadContent
---

# `updateMarkdownThreadContent`

```typescript
client.memory.updateMarkdownThreadContent(threadId: string, data: UpdateMarkdownContentRequest): Promise<unknown>
```

Replaces the markdown content of a thread.

Updates the actual markdown text content stored in the thread. This is separate from
metadata updates to allow efficient content-only writes.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the markdown thread |
| `data` | `UpdateMarkdownContentRequest` | Yes | The new markdown content |

## Returns

`Promise<unknown>` — A promise that resolves when the content has been updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.updateMarkdownThreadContent('threadId', /* UpdateMarkdownContentRequest */);
console.log(result);
```
