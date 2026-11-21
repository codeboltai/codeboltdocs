---
name: updateTodo
description: Updates an existing todo item's status, title, priority, or tags.
cbbaseinfo:
  description: Updates an existing todo item's status, title, priority, or tags.
data:
  name: updateTodo
  category: todo
  link: updateTodo.md
---

# updateTodo

```text
codebolt.todo.updateTodo(params: { id: string; title?: string; status?: "pending" | "processing" | "completed" | "cancelled"; priority?: "high" | "medium" | "low"; tags?: string[]; }): Promise<UpdateTodoResponse>
```

Updates an existing todo item's status, title, priority, or tags.

## Parameters

- `params` — The parameters for updating a todo.

## When to use it

Mark an item complete, change its priority, or rename it by ID.

## Example

### Change Priority and Add Tags

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Escalate a todo and add tags
  const result = await codebolt.todo.updateTodo({
    id: 'todo-id-456',
    priority: 'high',
    tags: ['urgent', 'customer-issue', 'escalated']
  });
  console.log('✅ Todo escalated and tagged');
});
```

## Complete an existing checklist item

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage(async () => {
  const response = await codebolt.todo.updateTodo({
    id: 'todo-id',
    status: 'completed',
  });
  console.log(response);
});
```
