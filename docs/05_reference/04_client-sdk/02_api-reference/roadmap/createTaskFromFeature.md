---
title: createTaskFromFeature
---

# `createTaskFromFeature`

```typescript
client.roadmap.createTaskFromFeature(featureId: string, data?: CreateTaskFromFeatureRequest): Promise<unknown>
```

Creates a task from a roadmap feature.

Converts a feature into an actionable task in the task management system. This
bridges the gap between roadmap planning and task execution.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `featureId` | `string` | Yes | The unique identifier of the feature to create a task from |
| `data` | `CreateTaskFromFeatureRequest` | No | Optional task creation parameters to override defaults |

## Returns

`Promise<unknown>` — A promise that resolves when the task has been created

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.roadmap.createTaskFromFeature('featureId');
console.log(result);
```
