---
title: getTaskGroups
---

# `getTaskGroups`

```typescript
client.projects.getTaskGroups(): Promise<TaskGroup[]>
```

Retrieves all task groups defined for the current project.

Task groups organize conversation threads into logical categories for better
workflow management and navigation.

## Parameters

_No parameters._

## Returns

`Promise<TaskGroup[]>` — A promise that resolves to an array of task groups

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projects.getTaskGroups();
console.log(result);
```
