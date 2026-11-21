---
title: summarizeContextThread
---

# `summarizeContextThread`

```typescript
client.memory.summarizeContextThread(threadId: string, data?: SummarizeContextRequest): Promise<unknown>
```

Generates a summary of the context stored in a thread.

Uses LLM processing to create a concise summary of all the context captured in the
thread. Useful for creating condensed knowledge bases from lengthy conversations.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the context thread to summarize |
| `data` | `SummarizeContextRequest` | No | Optional summarization parameters (e.g., max length, focus topics) |

## Returns

`Promise<unknown>` — A promise that resolves to the generated summary

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.summarizeContextThread('threadId');
console.log(result);
```
