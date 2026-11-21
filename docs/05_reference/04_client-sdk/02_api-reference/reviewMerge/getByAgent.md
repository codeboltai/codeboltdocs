---
title: getByAgent
---

# `getByAgent`

```typescript
client.reviewMerge.getByAgent(agentId: string): Promise<ReviewMergeRequest[]>
```

Retrieves all review-merge requests associated with a specific agent.

Filters requests by the agent that created or is assigned to them. Useful for
building agent-specific review dashboards or tracking an agent's review workload.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agentId` | `string` | Yes | The unique identifier of the agent to filter by |

## Returns

`Promise<ReviewMergeRequest[]>` — A promise that resolves to an array of ReviewMergeRequest objects for the agent

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.reviewMerge.getByAgent('agentId');
console.log(result);
```
