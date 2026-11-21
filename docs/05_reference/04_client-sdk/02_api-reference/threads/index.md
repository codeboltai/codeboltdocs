---
title: Threads API
---

# Threads API

Threads API - thread CRUD

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`advancedSearch`](./advancedSearch) | Performs an advanced search for threads based on multiple criteria. |
| [`autoUpdateName`](./autoUpdateName) | Automatically updates a thread's name based on its content. |
| [`bulkDelete`](./bulkDelete) | Deletes multiple threads in a single operation. |
| [`bulkUpdate`](./bulkUpdate) | Updates multiple threads in a single operation. |
| [`cancel`](./cancel) | Cancels the execution of a thread. |
| [`complete`](./complete) | Marks a thread as completed. |
| [`create`](./create) | Creates a new thread with the specified configuration. |
| [`delete`](./delete) | Deletes a thread from the system. |
| [`execute`](./execute) | Executes a thread with optional configuration parameters. |
| [`getById`](./getById) | Retrieves a thread by its unique identifier. |
| [`getChildren`](./getChildren) | Retrieves all direct child threads of a specified thread. |
| [`getDependencies`](./getDependencies) | Retrieves all threads that the specified thread depends on. |
| [`getGraph`](./getGraph) | Retrieves the complete thread graph structure. |
| [`getStatistics`](./getStatistics) | Retrieves statistics about threads in the system. |
| [`getThreadInfo`](./getThreadInfo) | Retrieves detailed information about a specific thread. |
| [`getTimeline`](./getTimeline) | Retrieves the timeline of events for a specific thread. |
| [`getTree`](./getTree) | Retrieves the hierarchical tree structure for a thread. |
| [`healthCheck`](./healthCheck) | Performs a health check on the thread service. |
| [`list`](./list) | Lists all threads with optional filtering. |
| [`pause`](./pause) | Pauses the execution of a running thread. |
| [`resume`](./resume) | Resumes execution of a paused thread. |
| [`searchThread`](./searchThread) | Searches for a specific thread by its ID. |
| [`update`](./update) | Updates an existing thread with new information. |
| [`updateProgress`](./updateProgress) | Updates the progress information for a thread. |
| [`updateStatus`](./updateStatus) | Updates the status of a specific thread. |

## Methods

---

### `advancedSearch`

```typescript
client.threads.advancedSearch(data: ThreadSearchRequest): Promise<Thread[]>
```

Performs an advanced search for threads based on multiple criteria.

Allows complex queries with filtering, sorting, and pagination to find
threads matching specific conditions. Use this for flexible thread discovery
and management operations.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ThreadSearchRequest` | Yes | The search request containing filter and query parameters |

**Returns:** `Promise<Thread[]>` — A promise that resolves to an array of matching Thread objects

[Full reference →](./advancedSearch)

---

### `autoUpdateName`

```typescript
client.threads.autoUpdateName(data: AutoUpdateNameRequest): Promise<void>
```

Automatically updates a thread's name based on its content.

Analyzes the thread's execution history, messages, and context to generate
an appropriate name that reflects its purpose and activity. This is useful
for maintaining descriptive thread labels without manual intervention.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `AutoUpdateNameRequest` | Yes | The request containing the thread ID to rename |

**Returns:** `Promise<void>` — A promise that resolves when the thread name has been updated

[Full reference →](./autoUpdateName)

---

### `bulkDelete`

```typescript
client.threads.bulkDelete(data: ThreadBulkDeleteRequest): Promise<void>
```

Deletes multiple threads in a single operation.

Removes the specified threads from the system in a bulk operation.
This is more efficient than deleting threads individually and ensures
atomic deletion of multiple threads.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ThreadBulkDeleteRequest` | Yes | The bulk delete request containing thread IDs to delete |

**Returns:** `Promise<void>` — A promise that resolves when all threads have been deleted

[Full reference →](./bulkDelete)

---

### `bulkUpdate`

```typescript
client.threads.bulkUpdate(data: ThreadBulkUpdateRequest): Promise<void>
```

Updates multiple threads in a single operation.

Performs bulk modifications across multiple threads simultaneously.
This is more efficient than updating threads individually when you need
to apply the same changes to many threads.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ThreadBulkUpdateRequest` | Yes | The bulk update request containing thread IDs and updates |

**Returns:** `Promise<void>` — A promise that resolves when all threads have been updated

[Full reference →](./bulkUpdate)

---

### `cancel`

```typescript
client.threads.cancel(threadId: string): Promise<void>
```

Cancels the execution of a thread.

Terminates the thread's operations and places it in a cancelled state.
Unlike pausing, this action cannot be reversed and the thread will not
continue execution. Use this to stop threads that are no longer needed.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to cancel |

**Returns:** `Promise<void>` — A promise that resolves when the thread has been cancelled

[Full reference →](./cancel)

---

### `complete`

```typescript
client.threads.complete(threadId: string): Promise<void>
```

Marks a thread as completed.

Sets the thread's status to completed, indicating that its execution
has finished successfully. This is typically done automatically by
the thread, but can be called manually when needed.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to complete |

**Returns:** `Promise<void>` — A promise that resolves when the thread has been marked complete

[Full reference →](./complete)

---

### `create`

```typescript
client.threads.create(data: CreateThreadRequest): Promise<Thread>
```

Creates a new thread with the specified configuration.

Initializes a new thread with the provided settings and parameters.
The thread will be created in an initial state and can be executed
when ready. Use this to set up new execution units.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateThreadRequest` | Yes | The thread creation request with configuration details |

**Returns:** `Promise<Thread>` — A promise that resolves to the newly created Thread object

[Full reference →](./create)

---

### `delete`

```typescript
client.threads.delete(threadId: string): Promise<void>
```

Deletes a thread from the system.

Permanently removes the specified thread and all its associated data.
This action cannot be undone, so use with caution. Deleting a thread
will also remove its relationships with other threads.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to delete |

**Returns:** `Promise<void>` — A promise that resolves when the thread has been deleted

[Full reference →](./delete)

---

### `execute`

```typescript
client.threads.execute(threadId: string, data?: ExecuteThreadRequest): Promise<Thread>
```

Executes a thread with optional configuration parameters.

Starts or resumes execution of the specified thread. You can provide
additional execution parameters to customize the run. The thread will
process its configured tasks and operations.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to execute |
| `data` | `ExecuteThreadRequest` | No | Optional execution configuration parameters |

**Returns:** `Promise<Thread>` — A promise that resolves to the updated Thread object

[Full reference →](./execute)

---

### `getById`

```typescript
client.threads.getById(id: string): Promise<Thread>
```

Retrieves a thread by its unique identifier.

Fetches the complete thread object including all its properties and
current state. This is the primary method for accessing thread details
when you know the thread's ID.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the thread to retrieve |

**Returns:** `Promise<Thread>` — A promise that resolves to the Thread object

[Full reference →](./getById)

---

### `getChildren`

```typescript
client.threads.getChildren(threadId: string): Promise<Thread[]>
```

Retrieves all direct child threads of a specified thread.

Returns threads that are immediate descendants of the given parent thread.
This is useful for navigating thread hierarchies and managing related threads.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the parent thread |

**Returns:** `Promise<Thread[]>` — A promise that resolves to an array of child Thread objects

[Full reference →](./getChildren)

---

### `getDependencies`

```typescript
client.threads.getDependencies(threadId: string): Promise<Thread[]>
```

Retrieves all threads that the specified thread depends on.

Returns threads that are prerequisites or dependencies of the given thread.
This is useful for understanding execution order requirements and managing
complex thread relationships.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread |

**Returns:** `Promise<Thread[]>` — A promise that resolves to an array of dependent Thread objects

[Full reference →](./getDependencies)

---

### `getGraph`

```typescript
client.threads.getGraph(): Promise<ThreadGraphNode[]>
```

Retrieves the complete thread graph structure.

Returns all threads as nodes in a graph representation, showing relationships
and connections between threads. This is useful for visualizing thread
hierarchies and dependencies.

_No parameters._

**Returns:** `Promise<ThreadGraphNode[]>` — A promise that resolves to an array of ThreadGraphNode objects

[Full reference →](./getGraph)

---

### `getStatistics`

```typescript
client.threads.getStatistics(): Promise<ThreadStatistics>
```

Retrieves statistics about threads in the system.

Returns aggregated metrics including total thread counts, status distributions,
and other statistical data. Use this to gain insights into thread activity
and system performance.

_No parameters._

**Returns:** `Promise<ThreadStatistics>` — A promise that resolves to ThreadStatistics containing various metrics

[Full reference →](./getStatistics)

---

### `getThreadInfo`

```typescript
client.threads.getThreadInfo(threadId: string): Promise<ThreadInfo>
```

Retrieves detailed information about a specific thread.

Returns comprehensive metadata and status information for the specified
thread, including its configuration, current state, and related attributes.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to retrieve |

**Returns:** `Promise<ThreadInfo>` — A promise that resolves to ThreadInfo containing thread details

[Full reference →](./getThreadInfo)

---

### `getTimeline`

```typescript
client.threads.getTimeline(threadId: string): Promise<ThreadTimelineEvent[]>
```

Retrieves the timeline of events for a specific thread.

Returns a chronological list of all events associated with the thread,
including status changes, executions, and other significant occurrences.
Use this to track thread activity and audit execution history.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread |

**Returns:** `Promise<ThreadTimelineEvent[]>` — A promise that resolves to an array of ThreadTimelineEvent objects

[Full reference →](./getTimeline)

---

### `getTree`

```typescript
client.threads.getTree(threadId: string): Promise<ThreadGraphNode>
```

Retrieves the hierarchical tree structure for a thread.

Returns the complete tree representation starting from the specified thread,
including all descendant threads and their relationships. This is useful for
visualizing thread hierarchies and understanding nested thread structures.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the root thread |

**Returns:** `Promise<ThreadGraphNode>` — A promise that resolves to a ThreadGraphNode representing the tree

[Full reference →](./getTree)

---

### `healthCheck`

```typescript
client.threads.healthCheck(): Promise<object>
```

Performs a health check on the thread service.

Verifies that the thread service is operational and responding to requests.
Use this for service monitoring or to check availability before performing
other thread operations.

_No parameters._

**Returns:** `Promise<object>` — A promise that resolves to an object containing the service status

[Full reference →](./healthCheck)

---

### `list`

```typescript
client.threads.list(params?: ThreadListParams): Promise<Thread[]>
```

Lists all threads with optional filtering.

Returns threads matching the provided query parameters, allowing you to
filter and paginate through the thread collection. Use this to browse
threads or find specific sets of threads based on criteria.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `ThreadListParams` | No | Optional query parameters for filtering threads |

**Returns:** `Promise<Thread[]>` — A promise that resolves to an array of Thread objects

[Full reference →](./list)

---

### `pause`

```typescript
client.threads.pause(threadId: string): Promise<void>
```

Pauses the execution of a running thread.

Suspends the thread's current operations and places it in a paused state.
The thread can be resumed later using the resume method. Use this to
temporarily halt execution without cancelling the thread.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to pause |

**Returns:** `Promise<void>` — A promise that resolves when the thread has been paused

[Full reference →](./pause)

---

### `resume`

```typescript
client.threads.resume(threadId: string): Promise<void>
```

Resumes execution of a paused thread.

Reactivates a thread that was previously paused, allowing it to continue
its operations from where it left off. The thread will return to an
active state and continue processing.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to resume |

**Returns:** `Promise<void>` — A promise that resolves when the thread has been resumed

[Full reference →](./resume)

---

### `searchThread`

```typescript
client.threads.searchThread(threadId: string): Promise<Thread>
```

Searches for a specific thread by its ID.

Performs a direct lookup to find a thread using its unique identifier.
This is the most efficient way to retrieve a thread when you know its ID.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to search for |

**Returns:** `Promise<Thread>` — A promise that resolves to the matching Thread object

[Full reference →](./searchThread)

---

### `update`

```typescript
client.threads.update(threadId: string, data: UpdateThreadRequest): Promise<Thread>
```

Updates an existing thread with new information.

Modifies the specified thread's configuration, metadata, or other
attributes. Only the fields provided in the request will be updated.
Use this to make changes to existing threads.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to update |
| `data` | `UpdateThreadRequest` | Yes | The update request containing the fields to modify |

**Returns:** `Promise<Thread>` — A promise that resolves to the updated Thread object

[Full reference →](./update)

---

### `updateProgress`

```typescript
client.threads.updateProgress(threadId: string, data: UpdateThreadProgressRequest): Promise<void>
```

Updates the progress information for a thread.

Modifies the thread's progress metrics, such as completion percentage,
current step, or other progress indicators. This is useful for tracking
execution progress and providing feedback to users.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to update |
| `data` | `UpdateThreadProgressRequest` | Yes | The request containing progress update information |

**Returns:** `Promise<void>` — A promise that resolves when the progress has been updated

[Full reference →](./updateProgress)

---

### `updateStatus`

```typescript
client.threads.updateStatus(threadId: string, data: UpdateThreadStatusRequest): Promise<void>
```

Updates the status of a specific thread.

Changes the execution state of the thread to a new status such as active,
paused, or completed. This controls the thread's lifecycle and availability
for execution.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to update |
| `data` | `UpdateThreadStatusRequest` | Yes | The request containing the new status information |

**Returns:** `Promise<void>` — A promise that resolves when the status has been updated

[Full reference →](./updateStatus)

