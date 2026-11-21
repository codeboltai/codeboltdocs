---
name: importTodos
description: Imports todos from JSON or Markdown format with optional merge strategy.
cbbaseinfo:
  description: Imports todos from JSON or Markdown format with optional merge strategy.
data:
  name: importTodos
  category: todo
  link: importTodos.md
---

# importTodos

```text
codebolt.todo.importTodos(params: { data: string; format?: "json" | "markdown"; mergeStrategy?: "replace" | "merge"; listId?: string; }): Promise<ImportTodosResponse>
```

Imports todos from JSON or Markdown format with optional merge strategy.

## Parameters

- `params` — The parameters for importing todos.

## Returns

A promise that resolves with the import result.

## When to use it

Load an existing checklist or task export. Choose merge when the destination already contains items you want to retain.

## Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const onboardingTemplate = [
    { title: 'Set up development environment', priority: 'high', tags: ['onboarding'] },
    { title: 'Review code style guide', priority: 'medium', tags: ['onboarding'] },
    { title: 'Complete first bug fix', priority: 'medium', tags: ['onboarding'] },
    { title: 'Attend team standup', priority: 'low', tags: ['onboarding'] }
  ];

  async function setupOnboardingTasks() {
    const result = await codebolt.todo.importTodos({
      data: JSON.stringify(onboardingTemplate),
      format: 'json',
      mergeStrategy: 'merge'
    });

    console.log('✅ Set up onboarding tasks');
    return result;
  }
});
```

## Merge a saved checklist

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage(async () => {
  const file = await codebolt.fs.readFile('todo-backup.json');
  if (!file.success || typeof file.content !== 'string') {
    throw new Error('Could not read the saved checklist.');
  }
  const result = await codebolt.todo.importTodos({
    data: file.content,
    format: 'json',
    mergeStrategy: 'merge',
  });
  console.log(result);
});
```
