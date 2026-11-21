---
title: exportMarkdown
---

# `exportMarkdown`

```typescript
client.planner.exportMarkdown(params?: ExportMarkdownParams): Promise<unknown>
```

Exports the current planner tasks as a markdown document.

Generates a markdown-formatted representation of all tasks, organized by agent or
status. Useful for creating reports, sharing progress externally, or backing up
the current plan.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `ExportMarkdownParams` | No | Optional parameters to control which tasks are exported and formatting |

## Returns

`Promise<unknown>` — A promise that resolves to the markdown content

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.planner.exportMarkdown();
console.log(result);
```
