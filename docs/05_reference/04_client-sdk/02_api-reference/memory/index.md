---
title: Memory API
---

# Memory API

Memory API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`addEpisodicEvents`](./addEpisodicEvents) | Appends new events to an episodic memory. |
| [`archiveContextThread`](./archiveContextThread) | Archives a context thread to remove it from active listings. |
| [`archiveEpisodicMemory`](./archiveEpisodicMemory) | Archives an episodic memory to remove it from active listings. |
| [`archiveJsonThread`](./archiveJsonThread) | Archives a JSON thread to remove it from active listings. |
| [`archiveMarkdownThread`](./archiveMarkdownThread) | Archives a markdown thread to remove it from active listings. |
| [`archiveThread`](./archiveThread) | Archives a generic memory thread to remove it from active listings. |
| [`createContextThread`](./createContextThread) | Creates a new context memory thread. |
| [`createEpisodicMemory`](./createEpisodicMemory) | Creates a new episodic memory for tracking temporal events and experiences. |
| [`createJsonThread`](./createJsonThread) | Creates a new JSON-formatted memory thread. |
| [`createMarkdownThread`](./createMarkdownThread) | Creates a new markdown-formatted memory thread. |
| [`createThread`](./createThread) | Creates a new generic memory thread. |
| [`getContextThread`](./getContextThread) | Retrieves a specific context thread by its unique identifier. |
| [`getEpisodicAgents`](./getEpisodicAgents) | Retrieves the distinct agents that have contributed events to an episodic memory. |
| [`getEpisodicEvents`](./getEpisodicEvents) | Retrieves events from an episodic memory with optional filtering. |
| [`getEpisodicEventTypes`](./getEpisodicEventTypes) | Retrieves the distinct event types used in an episodic memory. |
| [`getEpisodicMemory`](./getEpisodicMemory) | Retrieves a specific episodic memory by its unique identifier. |
| [`getEpisodicTags`](./getEpisodicTags) | Retrieves the distinct tags applied to events in an episodic memory. |
| [`getJsonThread`](./getJsonThread) | Retrieves a specific JSON thread by its unique identifier. |
| [`getMarkdownThread`](./getMarkdownThread) | Retrieves a specific markdown thread by its unique identifier. |
| [`getThread`](./getThread) | Retrieves a specific memory thread by its unique identifier. |
| [`listContextThreads`](./listContextThreads) | Lists all context memory threads with optional filtering. |
| [`listEpisodicMemories`](./listEpisodicMemories) | Lists all episodic memories with optional filtering. |
| [`listJsonThreads`](./listJsonThreads) | Lists all JSON memory threads with optional filtering. |
| [`listMarkdownThreads`](./listMarkdownThreads) | Lists all markdown memory threads with optional filtering. |
| [`listThreads`](./listThreads) | Lists all generic memory threads with optional filtering. |
| [`saveContextFromChat`](./saveContextFromChat) | Saves context extracted from a chat conversation into a context thread. |
| [`summarizeContextThread`](./summarizeContextThread) | Generates a summary of the context stored in a thread. |
| [`unarchiveEpisodicMemory`](./unarchiveEpisodicMemory) | Restores an archived episodic memory back to active status. |
| [`unarchiveJsonThread`](./unarchiveJsonThread) | Restores an archived JSON thread back to active status. |
| [`unarchiveMarkdownThread`](./unarchiveMarkdownThread) | Restores an archived markdown thread back to active status. |
| [`updateContextThread`](./updateContextThread) | Updates the metadata of a context thread. |
| [`updateEpisodicMemory`](./updateEpisodicMemory) | Updates the metadata of an episodic memory. |
| [`updateJsonThread`](./updateJsonThread) | Updates the metadata of a JSON thread (name, tags, etc.). |
| [`updateJsonThreadData`](./updateJsonThreadData) | Replaces the JSON data payload of a thread. |
| [`updateMarkdownThread`](./updateMarkdownThread) | Updates the metadata of a markdown thread (name, tags, etc.). |
| [`updateMarkdownThreadContent`](./updateMarkdownThreadContent) | Replaces the markdown content of a thread. |
| [`updateThread`](./updateThread) | Updates the metadata or content of a generic memory thread. |

## Methods

---

### `addEpisodicEvents`

```typescript
client.memory.addEpisodicEvents(id: string, data: AddEpisodicEventsRequest): Promise<unknown>
```

Appends new events to an episodic memory.

Adds one or more event records to the episodic memory's timeline. Events capture
discrete actions, observations, or state changes that occurred during an operation.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the episodic memory |
| `data` | `AddEpisodicEventsRequest` | Yes | The events to add |

**Returns:** `Promise<unknown>` — A promise that resolves when the events have been added

[Full reference →](./addEpisodicEvents)

---

### `archiveContextThread`

```typescript
client.memory.archiveContextThread(threadId: string): Promise<unknown>
```

Archives a context thread to remove it from active listings.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the context thread to archive |

**Returns:** `Promise<unknown>` — A promise that resolves when the thread has been archived

[Full reference →](./archiveContextThread)

---

### `archiveEpisodicMemory`

```typescript
client.memory.archiveEpisodicMemory(id: string): Promise<unknown>
```

Archives an episodic memory to remove it from active listings.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the episodic memory to archive |

**Returns:** `Promise<unknown>` — A promise that resolves when the memory has been archived

[Full reference →](./archiveEpisodicMemory)

---

### `archiveJsonThread`

```typescript
client.memory.archiveJsonThread(threadId: string): Promise<unknown>
```

Archives a JSON thread to remove it from active listings.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the JSON thread to archive |

**Returns:** `Promise<unknown>` — A promise that resolves when the thread has been archived

[Full reference →](./archiveJsonThread)

---

### `archiveMarkdownThread`

```typescript
client.memory.archiveMarkdownThread(threadId: string): Promise<unknown>
```

Archives a markdown thread to remove it from active listings.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the markdown thread to archive |

**Returns:** `Promise<unknown>` — A promise that resolves when the thread has been archived

[Full reference →](./archiveMarkdownThread)

---

### `archiveThread`

```typescript
client.memory.archiveThread(threadId: string): Promise<unknown>
```

Archives a generic memory thread to remove it from active listings.

Moves the thread to an archived state where it is preserved but hidden from default
queries. Archived threads can be restored later.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to archive |

**Returns:** `Promise<unknown>` — A promise that resolves when the thread has been archived

[Full reference →](./archiveThread)

---

### `createContextThread`

```typescript
client.memory.createContextThread(data: CreateContextThreadRequest): Promise<MemoryThread>
```

Creates a new context memory thread.

Initializes a thread designed to capture and store conversational context. Context
threads preserve the state and knowledge gathered during chat interactions for later
recall and summarization.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateContextThreadRequest` | Yes | The context thread creation payload |

**Returns:** `Promise<MemoryThread>` — A promise that resolves to the newly created context thread

[Full reference →](./createContextThread)

---

### `createEpisodicMemory`

```typescript
client.memory.createEpisodicMemory(data: CreateEpisodicMemoryRequest): Promise<MemoryThread>
```

Creates a new episodic memory for tracking temporal events and experiences.

Episodic memories store sequences of events that occurred during agent operations,
similar to how human episodic memory records experiences. They are useful for
learning from past actions and debugging agent behavior.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateEpisodicMemoryRequest` | Yes | The episodic memory creation payload |

**Returns:** `Promise<MemoryThread>` — A promise that resolves to the newly created episodic memory thread

[Full reference →](./createEpisodicMemory)

---

### `createJsonThread`

```typescript
client.memory.createJsonThread(data: CreateJsonThreadRequest): Promise<MemoryThread>
```

Creates a new JSON-formatted memory thread.

Initializes a thread optimized for storing structured JSON data. JSON threads are
ideal for configuration, structured records, and data that needs programmatic access.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateJsonThreadRequest` | Yes | The JSON thread creation payload |

**Returns:** `Promise<MemoryThread>` — A promise that resolves to the newly created JSON thread

[Full reference →](./createJsonThread)

---

### `createMarkdownThread`

```typescript
client.memory.createMarkdownThread(data: CreateMarkdownThreadRequest): Promise<MemoryThread>
```

Creates a new markdown-formatted memory thread.

Initializes a thread optimized for storing and rendering markdown content. Markdown
threads are ideal for notes, documentation, and free-form text with formatting.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateMarkdownThreadRequest` | Yes | The markdown thread creation payload |

**Returns:** `Promise<MemoryThread>` — A promise that resolves to the newly created markdown thread

[Full reference →](./createMarkdownThread)

---

### `createThread`

```typescript
client.memory.createThread(data: CreateMemoryThreadRequest): Promise<MemoryThread>
```

Creates a new generic memory thread.

Initializes a memory thread that can store arbitrary content. Generic threads are the
base type from which specialized thread types (markdown, JSON, context) derive.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateMemoryThreadRequest` | Yes | The thread creation payload |

**Returns:** `Promise<MemoryThread>` — A promise that resolves to the newly created memory thread

[Full reference →](./createThread)

---

### `getContextThread`

```typescript
client.memory.getContextThread(threadId: string): Promise<MemoryThread>
```

Retrieves a specific context thread by its unique identifier.

Returns the full context thread including captured conversation data and metadata.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the context thread to retrieve |

**Returns:** `Promise<MemoryThread>` — A promise that resolves to the context memory thread

[Full reference →](./getContextThread)

---

### `getEpisodicAgents`

```typescript
client.memory.getEpisodicAgents(id: string): Promise<string[]>
```

Retrieves the distinct agents that have contributed events to an episodic memory.

Returns the unique set of agent identifiers that recorded events in this memory.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the episodic memory |

**Returns:** `Promise<string[]>` — A promise that resolves to an array of agent identifier strings

[Full reference →](./getEpisodicAgents)

---

### `getEpisodicEvents`

```typescript
client.memory.getEpisodicEvents(id: string, params?: EpisodicEventsParams): Promise<unknown>
```

Retrieves events from an episodic memory with optional filtering.

Returns the sequence of events stored in the episodic memory, optionally filtered
by event type, date range, or agent.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the episodic memory |
| `params` | `EpisodicEventsParams` | No | Optional parameters to filter events |

**Returns:** `Promise<unknown>` — A promise that resolves to the filtered list of events

[Full reference →](./getEpisodicEvents)

---

### `getEpisodicEventTypes`

```typescript
client.memory.getEpisodicEventTypes(id: string): Promise<string[]>
```

Retrieves the distinct event types used in an episodic memory.

Returns the unique set of event type strings present in the memory, useful for
building filter UIs or understanding the kinds of events that were recorded.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the episodic memory |

**Returns:** `Promise<string[]>` — A promise that resolves to an array of event type strings

[Full reference →](./getEpisodicEventTypes)

---

### `getEpisodicMemory`

```typescript
client.memory.getEpisodicMemory(id: string): Promise<MemoryThread>
```

Retrieves a specific episodic memory by its unique identifier.

Returns the episodic memory metadata. Use  to access
the individual events stored within the memory.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the episodic memory to retrieve |

**Returns:** `Promise<MemoryThread>` — A promise that resolves to the episodic memory thread

[Full reference →](./getEpisodicMemory)

---

### `getEpisodicTags`

```typescript
client.memory.getEpisodicTags(id: string): Promise<string[]>
```

Retrieves the distinct tags applied to events in an episodic memory.

Returns the unique set of tag strings used across all events in the memory.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the episodic memory |

**Returns:** `Promise<string[]>` — A promise that resolves to an array of tag strings

[Full reference →](./getEpisodicTags)

---

### `getJsonThread`

```typescript
client.memory.getJsonThread(threadId: string): Promise<MemoryThread>
```

Retrieves a specific JSON thread by its unique identifier.

Returns the full JSON thread including its stored data payload and metadata.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the JSON thread to retrieve |

**Returns:** `Promise<MemoryThread>` — A promise that resolves to the JSON memory thread

[Full reference →](./getJsonThread)

---

### `getMarkdownThread`

```typescript
client.memory.getMarkdownThread(threadId: string): Promise<MemoryThread>
```

Retrieves a specific markdown thread by its unique identifier.

Returns the full markdown thread including its rendered content and metadata.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the markdown thread to retrieve |

**Returns:** `Promise<MemoryThread>` — A promise that resolves to the markdown memory thread

[Full reference →](./getMarkdownThread)

---

### `getThread`

```typescript
client.memory.getThread(threadId: string): Promise<MemoryThread>
```

Retrieves a specific memory thread by its unique identifier.

Returns the full thread object including metadata, content references, and status.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to retrieve |

**Returns:** `Promise<MemoryThread>` — A promise that resolves to the memory thread details

[Full reference →](./getThread)

---

### `listContextThreads`

```typescript
client.memory.listContextThreads(params?: ListMemoryThreadsParams): Promise<MemoryThread[]>
```

Lists all context memory threads with optional filtering.

Returns only threads of the context type, filtered by the provided parameters.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `ListMemoryThreadsParams` | No | Optional filtering and pagination parameters |

**Returns:** `Promise<MemoryThread[]>` — A promise that resolves to an array of context memory threads

[Full reference →](./listContextThreads)

---

### `listEpisodicMemories`

```typescript
client.memory.listEpisodicMemories(params?: ListMemoryThreadsParams): Promise<MemoryThread[]>
```

Lists all episodic memories with optional filtering.

Returns episodic memory records that match the provided criteria.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `ListMemoryThreadsParams` | No | Optional filtering and pagination parameters |

**Returns:** `Promise<MemoryThread[]>` — A promise that resolves to an array of episodic memory threads

[Full reference →](./listEpisodicMemories)

---

### `listJsonThreads`

```typescript
client.memory.listJsonThreads(params?: ListMemoryThreadsParams): Promise<MemoryThread[]>
```

Lists all JSON memory threads with optional filtering.

Returns only threads of the JSON type, filtered by the provided parameters.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `ListMemoryThreadsParams` | No | Optional filtering and pagination parameters |

**Returns:** `Promise<MemoryThread[]>` — A promise that resolves to an array of JSON memory threads

[Full reference →](./listJsonThreads)

---

### `listMarkdownThreads`

```typescript
client.memory.listMarkdownThreads(params?: ListMemoryThreadsParams): Promise<MemoryThread[]>
```

Lists all markdown memory threads with optional filtering.

Returns only threads of the markdown type, filtered by the provided parameters.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `ListMemoryThreadsParams` | No | Optional filtering and pagination parameters |

**Returns:** `Promise<MemoryThread[]>` — A promise that resolves to an array of markdown memory threads

[Full reference →](./listMarkdownThreads)

---

### `listThreads`

```typescript
client.memory.listThreads(params?: ListMemoryThreadsParams): Promise<MemoryThread[]>
```

Lists all generic memory threads with optional filtering.

Returns memory threads that match the provided filter criteria. Use this to browse
or search through stored memory threads.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `ListMemoryThreadsParams` | No | Optional filtering and pagination parameters |

**Returns:** `Promise<MemoryThread[]>` — A promise that resolves to an array of memory threads

[Full reference →](./listThreads)

---

### `saveContextFromChat`

```typescript
client.memory.saveContextFromChat(threadId: string, data: SaveContextFromChatRequest): Promise<unknown>
```

Saves context extracted from a chat conversation into a context thread.

Captures relevant information, decisions, and knowledge from an ongoing or completed
chat session and persists it in the specified context thread for future reference.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the context thread to save into |
| `data` | `SaveContextFromChatRequest` | Yes | The chat context extraction payload |

**Returns:** `Promise<unknown>` — A promise that resolves when the context has been saved

[Full reference →](./saveContextFromChat)

---

### `summarizeContextThread`

```typescript
client.memory.summarizeContextThread(threadId: string, data?: SummarizeContextRequest): Promise<unknown>
```

Generates a summary of the context stored in a thread.

Uses LLM processing to create a concise summary of all the context captured in the
thread. Useful for creating condensed knowledge bases from lengthy conversations.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the context thread to summarize |
| `data` | `SummarizeContextRequest` | No | Optional summarization parameters (e.g., max length, focus topics) |

**Returns:** `Promise<unknown>` — A promise that resolves to the generated summary

[Full reference →](./summarizeContextThread)

---

### `unarchiveEpisodicMemory`

```typescript
client.memory.unarchiveEpisodicMemory(id: string): Promise<unknown>
```

Restores an archived episodic memory back to active status.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the episodic memory to unarchive |

**Returns:** `Promise<unknown>` — A promise that resolves when the memory has been unarchived

[Full reference →](./unarchiveEpisodicMemory)

---

### `unarchiveJsonThread`

```typescript
client.memory.unarchiveJsonThread(threadId: string): Promise<unknown>
```

Restores an archived JSON thread back to active status.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the JSON thread to unarchive |

**Returns:** `Promise<unknown>` — A promise that resolves when the thread has been unarchived

[Full reference →](./unarchiveJsonThread)

---

### `unarchiveMarkdownThread`

```typescript
client.memory.unarchiveMarkdownThread(threadId: string): Promise<unknown>
```

Restores an archived markdown thread back to active status.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the markdown thread to unarchive |

**Returns:** `Promise<unknown>` — A promise that resolves when the thread has been unarchived

[Full reference →](./unarchiveMarkdownThread)

---

### `updateContextThread`

```typescript
client.memory.updateContextThread(threadId: string, data: UpdateContextThreadRequest): Promise<MemoryThread>
```

Updates the metadata of a context thread.

Modifies thread-level properties such as name and tags without affecting the stored
conversational context.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the context thread to update |
| `data` | `UpdateContextThreadRequest` | Yes | The metadata fields to update |

**Returns:** `Promise<MemoryThread>` — A promise that resolves to the updated context thread

[Full reference →](./updateContextThread)

---

### `updateEpisodicMemory`

```typescript
client.memory.updateEpisodicMemory(id: string, data: UpdateEpisodicMemoryRequest): Promise<MemoryThread>
```

Updates the metadata of an episodic memory.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the episodic memory to update |
| `data` | `UpdateEpisodicMemoryRequest` | Yes | The fields to update |

**Returns:** `Promise<MemoryThread>` — A promise that resolves to the updated episodic memory thread

[Full reference →](./updateEpisodicMemory)

---

### `updateJsonThread`

```typescript
client.memory.updateJsonThread(threadId: string, data: UpdateJsonThreadRequest): Promise<MemoryThread>
```

Updates the metadata of a JSON thread (name, tags, etc.).

Modifies thread-level properties without changing the stored JSON data.
Use  to change the actual data payload.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the JSON thread to update |
| `data` | `UpdateJsonThreadRequest` | Yes | The metadata fields to update |

**Returns:** `Promise<MemoryThread>` — A promise that resolves to the updated JSON thread

[Full reference →](./updateJsonThread)

---

### `updateJsonThreadData`

```typescript
client.memory.updateJsonThreadData(threadId: string, data: UpdateJsonDataRequest): Promise<unknown>
```

Replaces the JSON data payload of a thread.

Updates the structured data stored in the JSON thread. This is separate from metadata
updates to allow efficient data-only writes.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the JSON thread |
| `data` | `UpdateJsonDataRequest` | Yes | The new JSON data to store |

**Returns:** `Promise<unknown>` — A promise that resolves when the data has been updated

[Full reference →](./updateJsonThreadData)

---

### `updateMarkdownThread`

```typescript
client.memory.updateMarkdownThread(threadId: string, data: UpdateMarkdownThreadRequest): Promise<MemoryThread>
```

Updates the metadata of a markdown thread (name, tags, etc.).

Modifies thread-level properties without changing the markdown content itself.
Use  to change the actual markdown text.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the markdown thread to update |
| `data` | `UpdateMarkdownThreadRequest` | Yes | The metadata fields to update |

**Returns:** `Promise<MemoryThread>` — A promise that resolves to the updated markdown thread

[Full reference →](./updateMarkdownThread)

---

### `updateMarkdownThreadContent`

```typescript
client.memory.updateMarkdownThreadContent(threadId: string, data: UpdateMarkdownContentRequest): Promise<unknown>
```

Replaces the markdown content of a thread.

Updates the actual markdown text content stored in the thread. This is separate from
metadata updates to allow efficient content-only writes.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the markdown thread |
| `data` | `UpdateMarkdownContentRequest` | Yes | The new markdown content |

**Returns:** `Promise<unknown>` — A promise that resolves when the content has been updated

[Full reference →](./updateMarkdownThreadContent)

---

### `updateThread`

```typescript
client.memory.updateThread(threadId: string, data: UpdateMemoryThreadRequest): Promise<MemoryThread>
```

Updates the metadata or content of a generic memory thread.

Modifies an existing thread's properties such as name, tags, or stored data.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to update |
| `data` | `UpdateMemoryThreadRequest` | Yes | The fields to update on the thread |

**Returns:** `Promise<MemoryThread>` — A promise that resolves to the updated memory thread

[Full reference →](./updateThread)

