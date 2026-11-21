---
title: summarizeThread
---

# `summarizeThread`

```typescript
client.mail.summarizeThread(threadId: string): Promise<MailThreadSummary>
```

Generates a summarized view of a mail thread's conversation.

Produces a concise summary of the thread's messages, useful for quickly understanding
the key points of a long conversation without reading every message.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to summarize |

## Returns

`Promise<MailThreadSummary>` — A promise that resolves to the thread summary

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mail.summarizeThread('threadId');
console.log(result);
```
