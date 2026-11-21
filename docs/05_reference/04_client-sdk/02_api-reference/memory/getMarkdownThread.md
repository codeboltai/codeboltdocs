---
title: getMarkdownThread
---

# `getMarkdownThread`

```typescript
client.memory.getMarkdownThread(threadId: string): Promise<MemoryThread>
```

Retrieves a specific markdown thread by its unique identifier.

Returns the full markdown thread including its rendered content and metadata.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the markdown thread to retrieve |

## Returns

`Promise<MemoryThread>` — A promise that resolves to the markdown memory thread

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.getMarkdownThread('threadId');
console.log(result);
```
