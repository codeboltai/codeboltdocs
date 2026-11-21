---
name: getAllIncompleteTodos
description: Retrieves all todo items that are not yet completed.
cbbaseinfo:
  description: Retrieves all todo items that are not yet completed.
data:
  name: getAllIncompleteTodos
  category: todo
  link: getAllIncompleteTodos.md
---

# getAllIncompleteTodos

```text
codebolt.todo.getAllIncompleteTodos(): Promise<GetAllIncompleteTodosResponse>
```

Retrieves all todo items that are not yet completed.

## When to use it

Build a remaining-work list without manually filtering completed entries.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.todo.getAllIncompleteTodos();
  console.log(result);
});
```

## Summarize open work

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage(async () => {
  const response = await codebolt.todo.getAllIncompleteTodos();
  if (!response.success) return 'Could not load open todos.';

  const items = response.todos ?? [];
  return items.map(item => item.title).join('\n') || 'No open todos.';
});
```
