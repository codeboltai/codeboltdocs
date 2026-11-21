---
title: Chat API
---

# Chat API

Chat API - thread management, messaging, steps, and steering

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`activateThreadStep`](./activateThreadStep) | Activates a step in a chat thread. |
| [`addSteeringStep`](./addSteeringStep) | Adds a steering step to a thread. |
| [`addStep`](./addStep) | Adds a step to a thread via the add-step endpoint. |
| [`addThreadStep`](./addThreadStep) | Adds a step to a chat thread. |
| [`autoUpdateThreadName`](./autoUpdateThreadName) | Automatically generates and updates the thread name based on content. |
| [`clearThreadsMemory`](./clearThreadsMemory) | Clears all threads from memory. |
| [`completeThreadStep`](./completeThreadStep) | Completes a step in a chat thread. |
| [`createRemoteTask`](./createRemoteTask) | Creates a new remote task. |
| [`createScheduledTask`](./createScheduledTask) | Creates a new scheduled task. |
| [`createThread`](./createThread) | Creates a new chat thread. |
| [`deleteSteeringStep`](./deleteSteeringStep) | Deletes a steering step from a thread. |
| [`deleteTaskStep`](./deleteTaskStep) | Deletes a step from a thread via the task endpoint. |
| [`deleteThread`](./deleteThread) | Deletes a chat thread. |
| [`deleteThreadStep`](./deleteThreadStep) | Deletes a step from a chat thread. |
| [`getActiveThreadStep`](./getActiveThreadStep) | Retrieves the currently active step for a thread. |
| [`getMessages`](./getMessages) | Retrieves all messages for a specific thread. |
| [`getSteeringSteps`](./getSteeringSteps) | Retrieves all steering steps for a thread. |
| [`getTasks`](./getTasks) | Retrieves all chat tasks. |
| [`getTaskSteps`](./getTaskSteps) | Retrieves steps for a thread via the task endpoint. |
| [`getThreadInitiated`](./getThreadInitiated) | Checks whether a thread has been initiated. |
| [`getThreadsInfo`](./getThreadsInfo) | Retrieves information for all chat threads. |
| [`getThreadSteps`](./getThreadSteps) | Retrieves all steps for a chat thread. |
| [`hideThread`](./hideThread) | Hides a thread from the user interface. |
| [`initiateNewThread`](./initiateNewThread) | Initiates a new chat thread or retrieves an existing one. |
| [`initThread`](./initThread) | Initializes a chat thread. |
| [`removeThread`](./removeThread) | Removes a thread. |
| [`setActiveThread`](./setActiveThread) | Sets the active chat thread. |
| [`storeMessage`](./storeMessage) | Stores a new message in a chat thread. |
| [`switchThread`](./switchThread) | Switches to a different chat thread. |
| [`syncThreads`](./syncThreads) | Synchronizes threads from the thread store to the chat manager. |
| [`updateSteeringStep`](./updateSteeringStep) | Updates a steering step in a thread. |
| [`updateTask`](./updateTask) | Updates task information for a thread. |
| [`updateTaskStep`](./updateTaskStep) | Updates a step in a thread via the task endpoint. |
| [`updateThreadLocation`](./updateThreadLocation) | Updates the location context of a chat thread. |
| [`updateThreadName`](./updateThreadName) | Updates the display name of a chat thread. |
| [`updateThreadStatus`](./updateThreadStatus) | Updates the status of a chat thread. |
| [`updateThreadStep`](./updateThreadStep) | Updates a step within a chat thread. |
| [`updateThreadType`](./updateThreadType) | Updates the type of a chat thread. |

## Methods

---

### `activateThreadStep`

```typescript
client.chat.activateThreadStep(threadId: string, stepId: string): Promise<ChatThreadStep>
```

Activates a step in a chat thread.

Marks the specified step as the currently active step, indicating
that work is in progress on this step.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread |
| `stepId` | `string` | Yes | The unique identifier of the step to activate |

**Returns:** `Promise<ChatThreadStep>` — A promise that resolves to the activated ChatThreadStep

[Full reference →](./activateThreadStep)

---

### `addSteeringStep`

```typescript
client.chat.addSteeringStep(data: AddSteeringStepRequest): Promise<SteeringStep>
```

Adds a steering step to a thread.

Creates a steering step that guides the agent's behavior during
execution, providing directional instructions or constraints.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `AddSteeringStepRequest` | Yes | The steering step creation payload |

**Returns:** `Promise<SteeringStep>` — A promise that resolves to the created SteeringStep

[Full reference →](./addSteeringStep)

---

### `addStep`

```typescript
client.chat.addStep(data: AddStepRequest): Promise<ChatThreadStep>
```

Adds a step to a thread via the add-step endpoint.

An alternative method for adding steps that accepts the thread ID
as part of the request body rather than the URL path.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `AddStepRequest` | Yes | The step addition request including thread ID and step data |

**Returns:** `Promise<ChatThreadStep>` — A promise that resolves to the created ChatThreadStep

[Full reference →](./addStep)

---

### `addThreadStep`

```typescript
client.chat.addThreadStep(threadId: string, stepData: Record<string, unknown>): Promise<ChatThreadStep>
```

Adds a step to a chat thread.

Creates a new step within the thread's step sequence, representing
a discrete unit of work or progress in the conversation.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread |
| `stepData` | `Record<string, unknown>` | Yes | The step definition including type and content |

**Returns:** `Promise<ChatThreadStep>` — A promise that resolves to the created ChatThreadStep

[Full reference →](./addThreadStep)

---

### `autoUpdateThreadName`

```typescript
client.chat.autoUpdateThreadName(data: AutoUpdateThreadNameRequest): Promise<void>
```

Automatically generates and updates the thread name based on content.

Uses the user's message or conversation context to generate a
descriptive name for the thread, replacing any existing name.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `AutoUpdateThreadNameRequest` | Yes | The auto-update request |

**Returns:** `Promise<void>` — A promise that resolves when the name has been auto-updated

[Full reference →](./autoUpdateThreadName)

---

### `clearThreadsMemory`

```typescript
client.chat.clearThreadsMemory(): Promise<void>
```

Clears all threads from memory.

Removes all thread data from the in-memory cache, typically used
when switching projects to ensure a clean state.

_No parameters._

**Returns:** `Promise<void>` — A promise that resolves when the memory has been cleared

[Full reference →](./clearThreadsMemory)

---

### `completeThreadStep`

```typescript
client.chat.completeThreadStep(threadId: string, stepId: string, data?: CompleteStepData): Promise<ChatThreadStep>
```

Completes a step in a chat thread.

Marks the specified step as completed, optionally recording
completion details such as the outcome or output.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread |
| `stepId` | `string` | Yes | The unique identifier of the step to complete |
| `data` | `CompleteStepData` | No | Optional completion details |

**Returns:** `Promise<ChatThreadStep>` — A promise that resolves to the completed ChatThreadStep

[Full reference →](./completeThreadStep)

---

### `createRemoteTask`

```typescript
client.chat.createRemoteTask(data: CreateRemoteTaskRequest): Promise<unknown>
```

Creates a new remote task.

Registers a task that will be executed by a remote agent or service,
tracking it within the chat context.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateRemoteTaskRequest` | Yes | The remote task creation payload |

**Returns:** `Promise<unknown>` — A promise that resolves to the created task data

[Full reference →](./createRemoteTask)

---

### `createScheduledTask`

```typescript
client.chat.createScheduledTask(data: CreateScheduledTaskRequest): Promise<unknown>
```

Creates a new scheduled task.

Registers a task that will be executed at a future time, tracked
within the chat context.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateScheduledTaskRequest` | Yes | The scheduled task creation payload |

**Returns:** `Promise<unknown>` — A promise that resolves to the created task data

[Full reference →](./createScheduledTask)

---

### `createThread`

```typescript
client.chat.createThread(data: CreateChatThreadRequest): Promise<ChatThreadInfo>
```

Creates a new chat thread.

Provisions a new thread with the specified configuration, without
the automatic lookup behavior of initiateNewThread.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateChatThreadRequest` | Yes | The thread creation payload |

**Returns:** `Promise<ChatThreadInfo>` — A promise that resolves to the newly created ChatThreadInfo

[Full reference →](./createThread)

---

### `deleteSteeringStep`

```typescript
client.chat.deleteSteeringStep(threadId: string, steeringStepId: string): Promise<void>
```

Deletes a steering step from a thread.

Removes the specified steering instruction from the thread.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread |
| `steeringStepId` | `string` | Yes | The unique identifier of the steering step to delete |

**Returns:** `Promise<void>` — A promise that resolves when the steering step has been deleted

[Full reference →](./deleteSteeringStep)

---

### `deleteTaskStep`

```typescript
client.chat.deleteTaskStep(threadId: string, stepId: string): Promise<void>
```

Deletes a step from a thread via the task endpoint.

Removes a specific step from a thread's step sequence, accessed
through the task management API path.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread |
| `stepId` | `string` | Yes | The unique identifier of the step to delete |

**Returns:** `Promise<void>` — A promise that resolves when the step has been deleted

[Full reference →](./deleteTaskStep)

---

### `deleteThread`

```typescript
client.chat.deleteThread(data: ThreadIdRequest): Promise<void>
```

Deletes a chat thread.

Permanently removes the specified thread and all its associated
messages and steps.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ThreadIdRequest` | Yes | The thread identifier |

**Returns:** `Promise<void>` — A promise that resolves when the thread has been deleted

[Full reference →](./deleteThread)

---

### `deleteThreadStep`

```typescript
client.chat.deleteThreadStep(threadId: string, stepId: string): Promise<void>
```

Deletes a step from a chat thread.

Removes the specified step from the thread's step sequence.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread |
| `stepId` | `string` | Yes | The unique identifier of the step to delete |

**Returns:** `Promise<void>` — A promise that resolves when the step has been deleted

[Full reference →](./deleteThreadStep)

---

### `getActiveThreadStep`

```typescript
client.chat.getActiveThreadStep(threadId: string): Promise<ChatThreadStep | null>
```

Retrieves the currently active step for a thread.

Returns the step that is currently in progress, or null if no
step is active.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread |

**Returns:** `Promise<ChatThreadStep | null>` — A promise that resolves to the active ChatThreadStep or null

[Full reference →](./getActiveThreadStep)

---

### `getMessages`

```typescript
client.chat.getMessages(threadId: string): Promise<ChatMessage[]>
```

Retrieves all messages for a specific thread.

Returns the complete message history for the given thread,
ordered chronologically.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread |

**Returns:** `Promise<ChatMessage[]>` — A promise that resolves to an array of ChatMessage objects

[Full reference →](./getMessages)

---

### `getSteeringSteps`

```typescript
client.chat.getSteeringSteps(threadId: string): Promise<SteeringStep[]>
```

Retrieves all steering steps for a thread.

Returns the list of steering instructions that have been added
to guide agent behavior in the thread.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread |

**Returns:** `Promise<SteeringStep[]>` — A promise that resolves to an array of SteeringStep objects

[Full reference →](./getSteeringSteps)

---

### `getTasks`

```typescript
client.chat.getTasks(): Promise<unknown[]>
```

Retrieves all chat tasks.

Returns the list of tasks that have been created through the
chat system.

_No parameters._

**Returns:** `Promise<unknown[]>` — A promise that resolves to an array of task objects

[Full reference →](./getTasks)

---

### `getTaskSteps`

```typescript
client.chat.getTaskSteps(threadId: string): Promise<ChatThreadStep[]>
```

Retrieves steps for a thread via the task endpoint.

Returns the step sequence for a thread, accessed through the
task management API path.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread |

**Returns:** `Promise<ChatThreadStep[]>` — A promise that resolves to an array of ChatThreadStep objects

[Full reference →](./getTaskSteps)

---

### `getThreadInitiated`

```typescript
client.chat.getThreadInitiated(threadId: string): Promise<object>
```

Checks whether a thread has been initiated.

Returns a boolean indicating if the thread has gone through the
initiation process and is ready for interaction.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread |

**Returns:** `Promise<object>` — A promise that resolves to an object with an `initiated` boolean flag

[Full reference →](./getThreadInitiated)

---

### `getThreadsInfo`

```typescript
client.chat.getThreadsInfo(): Promise<ChatThreadInfo[]>
```

Retrieves information for all chat threads.

Returns summary information for every thread in the system,
suitable for populating a thread list or sidebar.

_No parameters._

**Returns:** `Promise<ChatThreadInfo[]>` — A promise that resolves to an array of ChatThreadInfo objects

[Full reference →](./getThreadsInfo)

---

### `getThreadSteps`

```typescript
client.chat.getThreadSteps(threadId: string): Promise<ChatThreadStep[]>
```

Retrieves all steps for a chat thread.

Returns the complete step sequence for the given thread, showing
the progression of work within the conversation.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread |

**Returns:** `Promise<ChatThreadStep[]>` — A promise that resolves to an array of ChatThreadStep objects

[Full reference →](./getThreadSteps)

---

### `hideThread`

```typescript
client.chat.hideThread(data: ThreadIdRequest): Promise<void>
```

Hides a thread from the user interface.

Removes the thread from the visible thread list without deleting it.
The thread data is preserved and can be restored later.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ThreadIdRequest` | Yes | The thread identifier |

**Returns:** `Promise<void>` — A promise that resolves when the thread has been hidden

[Full reference →](./hideThread)

---

### `initiateNewThread`

```typescript
client.chat.initiateNewThread(data: InitiateNewThreadRequest): Promise<ChatThreadInfo>
```

Initiates a new chat thread or retrieves an existing one.

Creates a new thread if one doesn't exist for the given context,
or returns the existing thread. This is the primary entry point
for starting a conversation.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `InitiateNewThreadRequest` | Yes | The thread initiation request |

**Returns:** `Promise<ChatThreadInfo>` — A promise that resolves to the ChatThreadInfo for the new or existing thread

[Full reference →](./initiateNewThread)

---

### `initThread`

```typescript
client.chat.initThread(data: InitiateNewThreadRequest): Promise<ChatThreadInfo>
```

Initializes a chat thread.

An alias for  that creates or retrieves
a thread based on the provided parameters.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `InitiateNewThreadRequest` | Yes | The thread initiation request |

**Returns:** `Promise<ChatThreadInfo>` — A promise that resolves to the ChatThreadInfo

[Full reference →](./initThread)

---

### `removeThread`

```typescript
client.chat.removeThread(data: ThreadIdRequest): Promise<void>
```

Removes a thread.

Removes the specified thread from the chat system. This is a
soft-delete that marks the thread as removed.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ThreadIdRequest` | Yes | The thread identifier |

**Returns:** `Promise<void>` — A promise that resolves when the thread has been removed

[Full reference →](./removeThread)

---

### `setActiveThread`

```typescript
client.chat.setActiveThread(data: SetActiveThreadRequest): Promise<void>
```

Sets the active chat thread.

Switches the current focus to the specified thread, making it the
primary conversation context for subsequent operations.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `SetActiveThreadRequest` | Yes | The active thread selection |

**Returns:** `Promise<void>` — A promise that resolves when the active thread has been set

[Full reference →](./setActiveThread)

---

### `storeMessage`

```typescript
client.chat.storeMessage(data: StoreMessageRequest): Promise<ChatMessage>
```

Stores a new message in a chat thread.

Persists a message to the thread's message history, recording
who sent it and its content.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `StoreMessageRequest` | Yes | The message storage payload |

**Returns:** `Promise<ChatMessage>` — A promise that resolves to the stored ChatMessage

[Full reference →](./storeMessage)

---

### `switchThread`

```typescript
client.chat.switchThread(data: ThreadIdRequest): Promise<void>
```

Switches to a different chat thread.

Changes the active conversation context to the specified thread,
triggering any associated UI updates.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ThreadIdRequest` | Yes | The thread identifier to switch to |

**Returns:** `Promise<void>` — A promise that resolves when the switch is complete

[Full reference →](./switchThread)

---

### `syncThreads`

```typescript
client.chat.syncThreads(): Promise<void>
```

Synchronizes threads from the thread store to the chat manager.

Ensures that the in-memory chat manager is up-to-date with the
persisted thread store, resolving any inconsistencies.

_No parameters._

**Returns:** `Promise<void>` — A promise that resolves when synchronization is complete

[Full reference →](./syncThreads)

---

### `updateSteeringStep`

```typescript
client.chat.updateSteeringStep(threadId: string, steeringStepId: string, data: UpdateSteeringStepData): Promise<SteeringStep>
```

Updates a steering step in a thread.

Modifies the instruction or metadata of an existing steering step.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread |
| `steeringStepId` | `string` | Yes | The unique identifier of the steering step to update |
| `data` | `UpdateSteeringStepData` | Yes | The fields to update on the steering step |

**Returns:** `Promise<SteeringStep>` — A promise that resolves to the updated SteeringStep

[Full reference →](./updateSteeringStep)

---

### `updateTask`

```typescript
client.chat.updateTask(data: UpdateChatTaskRequest): Promise<unknown>
```

Updates task information for a thread.

Modifies the task metadata or configuration associated with
a chat thread.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UpdateChatTaskRequest` | Yes | The task update payload |

**Returns:** `Promise<unknown>` — A promise that resolves to the updated task data

[Full reference →](./updateTask)

---

### `updateTaskStep`

```typescript
client.chat.updateTaskStep(threadId: string, stepId: string, data: UpdateThreadStepData): Promise<ChatThreadStep>
```

Updates a step in a thread via the task endpoint.

Modifies the properties of a thread step, accessed through the
task management API path.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread |
| `stepId` | `string` | Yes | The unique identifier of the step to update |
| `data` | `UpdateThreadStepData` | Yes | The fields to update on the step |

**Returns:** `Promise<ChatThreadStep>` — A promise that resolves to the updated ChatThreadStep

[Full reference →](./updateTaskStep)

---

### `updateThreadLocation`

```typescript
client.chat.updateThreadLocation(data: UpdateThreadLocationRequest): Promise<void>
```

Updates the location context of a chat thread.

Associates the thread with a specific file path or project location,
providing context for the conversation.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UpdateThreadLocationRequest` | Yes | The location update payload |

**Returns:** `Promise<void>` — A promise that resolves when the location has been updated

[Full reference →](./updateThreadLocation)

---

### `updateThreadName`

```typescript
client.chat.updateThreadName(data: UpdateThreadNameRequest): Promise<void>
```

Updates the display name of a chat thread.

Changes the human-readable name shown in the thread list.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UpdateThreadNameRequest` | Yes | The name update payload |

**Returns:** `Promise<void>` — A promise that resolves when the name has been updated

[Full reference →](./updateThreadName)

---

### `updateThreadStatus`

```typescript
client.chat.updateThreadStatus(data: UpdateChatThreadStatusRequest): Promise<void>
```

Updates the status of a chat thread.

Changes the thread's status (e.g., active, paused, completed),
which affects how it is displayed and processed.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UpdateChatThreadStatusRequest` | Yes | The status update payload |

**Returns:** `Promise<void>` — A promise that resolves when the status has been updated

[Full reference →](./updateThreadStatus)

---

### `updateThreadStep`

```typescript
client.chat.updateThreadStep(threadId: string, stepId: string, updateData: Record<string, unknown>): Promise<ChatThreadStep>
```

Updates a step within a chat thread.

Modifies the properties of an existing step, such as its status,
content, or metadata.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread |
| `stepId` | `string` | Yes | The unique identifier of the step to update |
| `updateData` | `Record<string, unknown>` | Yes | The fields to update on the step |

**Returns:** `Promise<ChatThreadStep>` — A promise that resolves to the updated ChatThreadStep

[Full reference →](./updateThreadStep)

---

### `updateThreadType`

```typescript
client.chat.updateThreadType(data: UpdateThreadTypeRequest): Promise<void>
```

Updates the type of a chat thread.

Changes the thread's type classification, which can affect routing,
display, and agent behavior.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UpdateThreadTypeRequest` | Yes | The type update payload |

**Returns:** `Promise<void>` — A promise that resolves when the type has been updated

[Full reference →](./updateThreadType)

