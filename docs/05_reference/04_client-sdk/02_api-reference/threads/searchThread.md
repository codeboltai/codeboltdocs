---
title: searchThread
---

# `searchThread`

```typescript
client.threads.searchThread(threadId: string): Promise<Thread>
```

Searches for a specific thread by its ID.

Performs a direct lookup to find a thread using its unique identifier.
This is the most efficient way to retrieve a thread when you know its ID.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to search for |

## Returns

`Promise<Thread>` — A promise that resolves to the matching Thread object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threads.searchThread('threadId');
console.log(result);
```
