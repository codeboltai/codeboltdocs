---
name: getTodoList
description: Retrieves the complete list of todo items.
cbbaseinfo:
  description: Retrieves the complete list of todo items.
data:
  name: getTodoList
  category: todo
  link: getTodoList.md
---

# getTodoList

```text
codebolt.todo.getTodoList(params?: any): Promise<GetTodoListResponse>
```

Retrieves the complete list of todo items.

## Parameters

- `params` — The parameters for getting the todo list.

## When to use it

Read todo lists to show their items in a task view or to inspect an existing checklist.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.todo.getTodoList();
  console.log(result);
});
```

## Inspect each list before exporting

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage(async () => {
  const response = await codebolt.todo.getTodoList();
  if (!response.success) return;
  for (const list of response.lists ?? (response.todoList ? [response.todoList] : [])) {
    console.log(list);
  }
});
```
