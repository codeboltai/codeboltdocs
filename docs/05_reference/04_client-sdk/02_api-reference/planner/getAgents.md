---
title: getAgents
---

# `getAgents`

```typescript
client.planner.getAgents(): Promise<PlannerAgent[]>
```

Retrieves all agents registered in the planner.

Returns the list of agents that have been assigned tasks or are available for task
assignment. Each agent includes its current workload and assignment information.

## Parameters

_No parameters._

## Returns

`Promise<PlannerAgent[]>` — A promise that resolves to an array of planner agents

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.planner.getAgents();
console.log(result);
```
