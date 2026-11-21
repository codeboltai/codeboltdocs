# Todo

Track todo items and their progress.

## When to use it

Keep a checklist for the current work, then export it when a report or handoff needs the task state.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.todo.addTodo({
    title: 'Implement user authentication',
    priority: 'high',
    tags: ['backend', 'security']
  });
  console.log(result);
});
```

## SDK methods

### addTodo

[`addTodo`](addTodo.md)

### updateTodo

[`updateTodo`](updateTodo.md)

### getTodoList

[`getTodoList`](getTodoList.md)

### getAllIncompleteTodos

[`getAllIncompleteTodos`](getAllIncompleteTodos.md)

### exportTodos

[`exportTodos`](exportTodos.md)

### importTodos

[`importTodos`](importTodos.md)
