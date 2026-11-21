---
title: getExecutionTree
---

# `getExecutionTree`

```typescript
client.agentExecution.getExecutionTree(threadId: string): Promise<AgentExecutionTree>
```

Retrieves the execution tree for a specific thread.

Returns a hierarchical view of the execution, showing parent-child
relationships between agents in multi-agent workflows. Useful for
visualizing how agents spawned sub-agents during execution.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread |

## Returns

`Promise<AgentExecutionTree>` — A promise that resolves to the AgentExecutionTree structure

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentExecution.getExecutionTree('threadId');
console.log(result);
```
