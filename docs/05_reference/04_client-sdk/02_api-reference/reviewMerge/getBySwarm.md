---
title: getBySwarm
---

# `getBySwarm`

```typescript
client.reviewMerge.getBySwarm(swarmId: string): Promise<ReviewMergeRequest[]>
```

Retrieves all review-merge requests associated with a specific swarm.

Filters requests by the swarm that generated them. Useful for monitoring review
activity within a particular swarm context.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm to filter by |

## Returns

`Promise<ReviewMergeRequest[]>` — A promise that resolves to an array of ReviewMergeRequest objects for the swarm

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.reviewMerge.getBySwarm('swarmId');
console.log(result);
```
