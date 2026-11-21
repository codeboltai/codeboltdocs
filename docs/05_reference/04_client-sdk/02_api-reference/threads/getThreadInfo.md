---
title: getThreadInfo
---

# `getThreadInfo`

```typescript
client.threads.getThreadInfo(threadId: string): Promise<ThreadInfo>
```

Retrieves detailed information about a specific thread.

Returns comprehensive metadata and status information for the specified
thread, including its configuration, current state, and related attributes.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to retrieve |

## Returns

`Promise<ThreadInfo>` — A promise that resolves to ThreadInfo containing thread details

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threads.getThreadInfo('threadId');
console.log(result);
```
