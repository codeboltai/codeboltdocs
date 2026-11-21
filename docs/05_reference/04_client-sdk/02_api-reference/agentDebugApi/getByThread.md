---
title: getByThread
---

# `getByThread`

```typescript
client.agentDebugApi.getByThread(threadId: string): Promise<AgentDebugInstance[]>
```

Retrieves agent instances associated with a specific thread.

Returns all debug instances that were spawned within or are linked to
the given thread ID.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to query |

## Returns

`Promise<AgentDebugInstance[]>` — A promise that resolves to an array of AgentDebugInstance objects for that thread

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentDebugApi.getByThread('threadId');
console.log(result);
```
