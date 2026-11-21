---
title: tasks
---

# tasks

Task update events. Access via `client.sockets.tasks`.

All socket modules extend `TypedEventEmitter` and provide `.on()`, `.off()`, `.once()` for event listening.

## Events

Listen for events using `client.sockets.tasks.on(event, handler)`:

| Event |
|---|
| `taskAdded` |
| `taskUpdated` |
| `taskDeleted` |
| `subtaskAdded` |
| `subtaskUpdated` |
| `subtaskDeleted` |
| `allTasks` |
| `tasksByAgent` |
| `tasksByCategory` |
| `allAgents` |
| `initial` |
| `error` |
| `connected` |

```typescript
client.sockets.tasks.on('taskAdded', (data) => {
  console.log(data);
});
```

## Send Methods

| Method |
|---|
| `addTask()` |
| `updateTask()` |
| `deleteTask()` |
| `addSubTask()` |
| `updateSubTask()` |
| `deleteSubTask()` |
| `getTasks()` |
| `getTasksByAgent()` |

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

// Listen for events
client.sockets.tasks.on('taskAdded', (data) => {
  console.log('taskAdded:', data);
});

// Send
client.sockets.tasks.addTask();
```
