---
title: getThreadsInfo
---

# `getThreadsInfo`

```typescript
client.chat.getThreadsInfo(): Promise<ChatThreadInfo[]>
```

Retrieves information for all chat threads.

Returns summary information for every thread in the system,
suitable for populating a thread list or sidebar.

## Parameters

_No parameters._

## Returns

`Promise<ChatThreadInfo[]>` — A promise that resolves to an array of ChatThreadInfo objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.chat.getThreadsInfo();
console.log(result);
```
