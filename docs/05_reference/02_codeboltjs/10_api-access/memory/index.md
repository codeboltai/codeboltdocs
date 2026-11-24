# Memory

**Default server support.** The SDK sends `saveMemory`, `updateMemory`, `deleteMemory`, and `listMemory` as memory events. The default server routes these events to its key-value handler, which accepts `get` and `set`. Record requests return an unknown-action error. For key-value storage, use [DB Memory](../dbmemory/index.md).

Store, update, and list JSON, Markdown, and todo memory records.

Choose the format by namespace. Each namespace exposes `save`, `update`, `delete`, and `list`.

## Store a value with the default server

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const saved = await codebolt.dbmemory.addKnowledge('docs:language', 'en');
  if (!saved.success) throw new Error(saved.error ?? 'Could not save the value');
  const read = await codebolt.dbmemory.getKnowledge('docs:language');
  if (read.success) console.log(read.value);
});
```

## Intended use

Choose JSON for structured data, Markdown for readable notes, and todo memory for task lists you need to retrieve later.

## Request examples for a compatible server

### Save JSON Data

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.memory.json.save({
    userId: '123',
    preferences: {
      notifications: true,
      theme: 'dark'
    },
    lastLogin: new Date().toISOString()
  });

  console.log('Memory ID:', result.memoryId);
});
```

### List JSON Entries

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.memory.json.list({
    userId: '123'
  });

  if (result.items == null) throw new Error('The response is missing items.');
  console.log('Found entries:', result.items.length);
});
```

### List Todos with Filters

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get all high-priority todos
  const highPriority = await codebolt.memory.todo.list({
    priority: 'high',
    status: 'pending'
  });

  // Get todos for a specific project
  const projectTodos = await codebolt.memory.todo.list({
    'metadata.project': 'api-development'
  });
});
```

### Save Markdown Content

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const markdown = `
# API Documentation

## Overview
This API provides...

## Endpoints
- GET /api/users
- POST /api/users
`;

  const result = await codebolt.memory.markdown.save(markdown, {
    category: 'documentation',
    version: '1.0',
    author: 'dev-team'
  });
});
```

### Use Appropriate Format

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Good: Use JSON for structured data
  await codebolt.memory.json.save({
    userId: '123',
    settings: { theme: 'dark' }
  });

  // Good: Use Todo for task items
  await codebolt.memory.todo.save({
    title: 'Task',
    status: 'pending'
  });

  // Good: Use Markdown for documentation
  await codebolt.memory.markdown.save('# Documentation\n\nContent here');

  // Bad: Using wrong format
  await codebolt.memory.json.save('# This should be markdown');
});
```

## SDK methods

### json.save

```text
codebolt.memory.json.save(json: any): Promise<SaveMemoryResponse>
```

### json.update

```text
codebolt.memory.json.update(memoryId: string, json: any): Promise<UpdateMemoryResponse>
```

### json.delete

```text
codebolt.memory.json.delete(memoryId: string): Promise<DeleteMemoryResponse>
```

### json.list

```text
codebolt.memory.json.list(filters?: Record<string, unknown>): Promise<ListMemoryResponse>
```

### todo.save

```text
codebolt.memory.todo.save(todo: TodoData, metadata?: Record<string, unknown>): Promise<SaveMemoryResponse>
```

### todo.update

```text
codebolt.memory.todo.update(memoryId: string, todo: TodoItem): Promise<UpdateMemoryResponse>
```

### todo.delete

```text
codebolt.memory.todo.delete(memoryId: string): Promise<DeleteMemoryResponse>
```

### todo.list

```text
codebolt.memory.todo.list(filters?: Record<string, unknown>): Promise<ListMemoryResponse>
```

### markdown.save

```text
codebolt.memory.markdown.save(markdown: string, metadata?: Record<string, unknown>): Promise<SaveMemoryResponse>
```

### markdown.update

```text
codebolt.memory.markdown.update(memoryId: string, markdown: string, metadata?: Record<string, unknown>): Promise<UpdateMemoryResponse>
```

### markdown.delete

```text
codebolt.memory.markdown.delete(memoryId: string): Promise<DeleteMemoryResponse>
```

### markdown.list

```text
codebolt.memory.markdown.list(filters?: Record<string, unknown>): Promise<ListMemoryResponse>
```
