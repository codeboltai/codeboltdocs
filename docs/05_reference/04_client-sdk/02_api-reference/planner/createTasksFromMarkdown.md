---
title: createTasksFromMarkdown
---

# `createTasksFromMarkdown`

```typescript
client.planner.createTasksFromMarkdown(data: CreateTasksFromMarkdownRequest): Promise<PlannerTask[]>
```

Bulk-creates tasks by parsing a markdown document.

Parses a markdown-formatted task list (using checkboxes, headings, and lists) and
creates individual planner tasks from it. This enables rapid task creation from
planning documents or specifications.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateTasksFromMarkdownRequest` | Yes | The request containing the markdown content to parse |

## Returns

`Promise<PlannerTask[]>` — A promise that resolves to an array of the newly created tasks

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.planner.createTasksFromMarkdown(/* CreateTasksFromMarkdownRequest */);
console.log(result);
```
