---
name: addTodo
description: Adds a new todo item with optional priority and tags.
cbbaseinfo:
  description: Adds a new todo item with optional priority and tags.
data:
  name: addTodo
  category: todo
  link: addTodo.md
---

# addTodo

```text
codebolt.todo.addTodo(params: { title: string; priority?: "high" | "medium" | "low"; tags?: string[]; }): Promise<AddTodoResponse>
```

Adds a new todo item with optional priority and tags.

## Parameters

- `params` — The parameters for adding a todo.

## When to use it

Capture a checklist item with a priority or tags when the agent identifies work to track.

## Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Quick capture during meetings or brainstorming
  const quickIdeas = [
    'Consider using Redis for caching',
    'Add rate limiting to API',
    'Improve error handling',
    'Set up monitoring dashboard'
  ];

  for (const idea of quickIdeas) {
    await codebolt.todo.addTodo({ title: idea });
  }
});
```

## Create a checklist item with tags

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage(async () => {
  const response = await codebolt.todo.addTodo({
    title: 'Review README setup steps',
    priority: 'high',
    tags: ['documentation', 'review'],
  });
  console.log(response);
});
```
