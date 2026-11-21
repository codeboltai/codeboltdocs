---
title: getExecution
---

# `getExecution`

```typescript
client.agentExecution.getExecution(threadId: string): Promise<AgentExecutionRecord>
```

Retrieves the execution record for a specific thread.

Returns detailed execution information including timing, status,
agent configuration, and outcome for the given thread.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread |

## Returns

`Promise<AgentExecutionRecord>` — A promise that resolves to the AgentExecutionRecord for that thread

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentExecution.getExecution('threadId');
console.log(result);
```
