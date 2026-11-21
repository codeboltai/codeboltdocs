---
title: getAgentTasks
---

# `getAgentTasks`

```typescript
client.planner.getAgentTasks(agentId: string): Promise<PlannerTask[]>
```

Retrieves all tasks assigned to a specific agent.

Returns the task list for a given agent, allowing you to see what work is queued,
in progress, or completed for that agent.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agentId` | `string` | Yes | The unique identifier of the agent whose tasks to retrieve |

## Returns

`Promise<PlannerTask[]>` — A promise that resolves to an array of tasks assigned to the agent

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.planner.getAgentTasks('agentId');
console.log(result);
```
