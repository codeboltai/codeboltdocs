---
title: getForProject
---

# `getForProject`

```typescript
client.tasks.getForProject(projectPath: string): Promise<Task[]>
```

Retrieves all tasks for a specific project path.

Returns tasks that belong to the project identified by its filesystem
path. This allows accessing tasks from any project regardless of the
current working directory context.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `projectPath` | `string` | Yes | The filesystem path identifying the target project |

## Returns

`Promise<Task[]>` — A promise that resolves to an array of Task objects for the specified project

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.tasks.getForProject('projectPath');
console.log(result);
```
