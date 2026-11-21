---
title: Todos API
---

# Todos API

Todos API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`archiveThread`](./archiveThread) | Archives a todo thread. |
| [`bulkCreate`](./bulkCreate) | Bulk-creates multiple todos at once. |
| [`create`](./create) | Creates a new todo. |
| [`createThread`](./createThread) | Creates a new todo thread. |
| [`delete`](./delete) | Deletes a todo by ID. |
| [`deleteAllCompleted`](./deleteAllCompleted) | Deletes all completed todos, optionally filtered by thread. |
| [`exportTodos`](./exportTodos) | Exports todos, optionally filtered by thread. |
| [`get`](./get) | Retrieves a specific todo by ID. |
| [`getAll`](./getAll) | Retrieves all todos, optionally filtered by thread. |
| [`getStats`](./getStats) | Retrieves todo statistics, optionally filtered by thread. |
| [`getThreads`](./getThreads) | Retrieves all todo threads. |
| [`importTodos`](./importTodos) | Imports todos from an external source. |
| [`unarchiveThread`](./unarchiveThread) | Unarchives a todo thread. |
| [`update`](./update) | Updates an existing todo. |

## Methods

---

### `archiveThread`

```typescript
client.todos.archiveThread(threadId: string): Promise<void>
```

Archives a todo thread.

Marks the specified thread as archived, removing it from active view
while preserving all todos within it. Archived threads can still be
accessed but are typically hidden from default views.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to archive |

**Returns:** `Promise<void>` — A promise that resolves when the thread has been archived

[Full reference →](./archiveThread)

---

### `bulkCreate`

```typescript
client.todos.bulkCreate(data: BulkCreateTodosRequest): Promise<TodoItem[]>
```

Bulk-creates multiple todos at once.

Creates multiple todo items in a single API call, which is more efficient
than creating them individually. Use this for batch operations, importing
tasks, or initializing a thread with multiple items.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `BulkCreateTodosRequest` | Yes | Bulk todo creation payload containing multiple items |

**Returns:** `Promise<TodoItem[]>` — A promise that resolves to an array of created TodoItem objects

[Full reference →](./bulkCreate)

---

### `create`

```typescript
client.todos.create(data: CreateTodoRequest): Promise<TodoItem>
```

Creates a new todo.

Initializes a new todo item with the provided data. The todo can be
assigned to a thread, given a priority, and include any other relevant
task information.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateTodoRequest` | Yes | Todo creation payload containing task details |

**Returns:** `Promise<TodoItem>` — A promise that resolves to the created TodoItem object

[Full reference →](./create)

---

### `createThread`

```typescript
client.todos.createThread(data: CreateTodoThreadRequest): Promise<TodoList>
```

Creates a new todo thread.

Initializes a new thread for organizing related todos. Threads
provide structure and context for groups of tasks, making them
easier to manage and track together.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateTodoThreadRequest` | Yes | Thread creation payload containing name and optional metadata |

**Returns:** `Promise<TodoList>` — A promise that resolves to the created TodoList thread object

[Full reference →](./createThread)

---

### `delete`

```typescript
client.todos.delete(todoId: string): Promise<void>
```

Deletes a todo by ID.

Permanently removes the specified todo from the system. This operation
cannot be undone. Use with caution and consider alternatives like
archiving if the todo should be preserved for historical purposes.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `todoId` | `string` | Yes | The unique identifier of the todo to delete |

**Returns:** `Promise<void>` — A promise that resolves when the todo has been deleted

[Full reference →](./delete)

---

### `deleteAllCompleted`

```typescript
client.todos.deleteAllCompleted(params?: TodoListParams): Promise<void>
```

Deletes all completed todos, optionally filtered by thread.

Removes all todos with a completed status. When a threadId is provided,
only completed todos within that specific thread are deleted. This is
useful for cleanup operations to maintain a tidy task list.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `TodoListParams` | No | Optional query parameters for filtering deletion scope |

**Returns:** `Promise<void>` — A promise that resolves when all completed todos have been deleted

[Full reference →](./deleteAllCompleted)

---

### `exportTodos`

```typescript
client.todos.exportTodos(params?: TodoExportParams): Promise<unknown>
```

Exports todos, optionally filtered by thread.

Returns todo data in a format suitable for external systems or backup.
The export can be scoped to a specific thread or include all todos
in the system. The exact format depends on server configuration.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `TodoExportParams` | No | Optional query parameters for filtering the export |

**Returns:** `Promise<unknown>` — A promise that resolves to the exported todo data

[Full reference →](./exportTodos)

---

### `get`

```typescript
client.todos.get(todoId: string): Promise<TodoItem>
```

Retrieves a specific todo by ID.

Returns detailed information about a single todo item including
its current status, description, assignee, and all other fields.
Use this to get the full details of a particular task.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `todoId` | `string` | Yes | The unique identifier of the todo to retrieve |

**Returns:** `Promise<TodoItem>` — A promise that resolves to the requested TodoItem object

[Full reference →](./get)

---

### `getAll`

```typescript
client.todos.getAll(params?: TodoListParams): Promise<TodoItem[]>
```

Retrieves all todos, optionally filtered by thread.

Returns all todo items in the system. When a threadId is provided,
only todos belonging to that specific thread are returned. This
is useful for displaying task lists scoped to a particular context.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `TodoListParams` | No | Optional query parameters for filtering todos |

**Returns:** `Promise<TodoItem[]>` — A promise that resolves to an array of TodoItem objects

[Full reference →](./getAll)

---

### `getStats`

```typescript
client.todos.getStats(params?: TodoListParams): Promise<TodoStats>
```

Retrieves todo statistics, optionally filtered by thread.

Returns aggregated statistics about todos including counts by status,
priority distribution, and completion rates. When a threadId is provided,
statistics are scoped to that specific thread only.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `TodoListParams` | No | Optional query parameters for filtering statistics |

**Returns:** `Promise<TodoStats>` — A promise that resolves to TodoStats object with metrics

[Full reference →](./getStats)

---

### `getThreads`

```typescript
client.todos.getThreads(): Promise<TodoList[]>
```

Retrieves all todo threads.

Returns all thread objects that organize todos into logical groups.
Threads can represent projects, features, or any other categorization
scheme. Use this to get an overview of all todo collections.

_No parameters._

**Returns:** `Promise<TodoList[]>` — A promise that resolves to an array of TodoList thread objects

[Full reference →](./getThreads)

---

### `importTodos`

```typescript
client.todos.importTodos(data: ImportTodosRequest): Promise<TodoItem[]>
```

Imports todos from an external source.

Imports todo items from an external system or file format. This enables
migrating tasks from other todo management tools or bulk loading
tasks from predefined lists.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ImportTodosRequest` | Yes | Import payload containing external todo data |

**Returns:** `Promise<TodoItem[]>` — A promise that resolves to an array of imported TodoItem objects

[Full reference →](./importTodos)

---

### `unarchiveThread`

```typescript
client.todos.unarchiveThread(threadId: string): Promise<void>
```

Unarchives a todo thread.

Removes the archived status from the specified thread, making it
visible in active views again. This restores the thread and all its
todos to normal operational status.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to unarchive |

**Returns:** `Promise<void>` — A promise that resolves when the thread has been unarchived

[Full reference →](./unarchiveThread)

---

### `update`

```typescript
client.todos.update(todoId: string, data: UpdateTodoRequest): Promise<TodoItem>
```

Updates an existing todo.

Modifies the specified todo with the provided field values. Only the
fields included in the request will be updated; all other fields remain
unchanged. Use this to change status, reassign tasks, or update details.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `todoId` | `string` | Yes | The unique identifier of the todo to update |
| `data` | `UpdateTodoRequest` | Yes | Partial update payload containing fields to modify |

**Returns:** `Promise<TodoItem>` — A promise that resolves to the updated TodoItem object

[Full reference →](./update)

