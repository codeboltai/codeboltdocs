---
name: exportTodos
description: Exports todos in JSON or Markdown format with optional filtering.
cbbaseinfo:
  description: Exports todos in JSON or Markdown format with optional filtering.
data:
  name: exportTodos
  category: todo
  link: exportTodos.md
---

# exportTodos

```text
codebolt.todo.exportTodos(params?: { format?: "json" | "markdown"; listId?: string; status?: string[]; }): Promise<ExportTodosResponse>
```

Exports todos in JSON or Markdown format with optional filtering.

## Parameters

- `params` — The parameters for exporting todos.

## Returns

A promise that resolves with the exported data.

## When to use it

Export selected todo items to a Markdown checklist or a JSON snapshot for a handoff.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.todo.exportTodos({
    format: 'json'
  });
  console.log(result);
});
```

## Save completed items as Markdown

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage(async () => {
  const result = await codebolt.todo.exportTodos({ format: 'markdown', status: ['completed'] });
  if (!result.success || typeof result.data !== 'string') {
    throw new Error(result.message ?? 'Could not export the checklist.');
  }
  await codebolt.fs.writeToFile('completed-todos.md', result.data);
});
```
