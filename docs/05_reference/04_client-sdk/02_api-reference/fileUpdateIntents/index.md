---
title: FileUpdateIntents API
---

# FileUpdateIntents API

File Update Intents API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`cancel`](./cancel) | Cancels a file update intent. |
| [`checkOverlap`](./checkOverlap) | Checks for overlapping file update intents. |
| [`complete`](./complete) | Marks a file update intent as complete. |
| [`create`](./create) | Creates a new file update intent. |
| [`delete`](./delete) | Deletes a file update intent. |
| [`get`](./get) | Retrieves a specific file update intent by its ID. |
| [`getBlockedFiles`](./getBlockedFiles) | Retrieves a list of currently blocked files. |
| [`getByAgent`](./getByAgent) | Retrieves file update intents for a specific agent. |
| [`getFilesWithIntents`](./getFilesWithIntents) | Retrieves files that have active update intents. |
| [`list`](./list) | Lists all file update intents in the system. |
| [`update`](./update) | Updates an existing file update intent. |

## Methods

---

### `cancel`

```typescript
client.fileUpdateIntents.cancel(id: string, data?: CancelFileUpdateIntentRequest): Promise<unknown>
```

Cancels a file update intent.

Aborts an in-progress intent and releases any held resources or locks.
Use this when an operation fails or needs to be terminated before
completion.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the intent |
| `data` | `CancelFileUpdateIntentRequest` | No | Optional cancellation parameters |

**Returns:** `Promise<unknown>` — A promise that resolves when the intent is cancelled

[Full reference →](./cancel)

---

### `checkOverlap`

```typescript
client.fileUpdateIntents.checkOverlap(data: CheckOverlapRequest): Promise<CheckOverlapResult>
```

Checks for overlapping file update intents.

Evaluates whether proposed file operations would conflict with existing
intents from other agents or processes. Returns detailed conflict information
to help resolve concurrent modification issues.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CheckOverlapRequest` | Yes | Request containing overlap check parameters |

**Returns:** `Promise<CheckOverlapResult>` — A promise that resolves to overlap detection results

[Full reference →](./checkOverlap)

---

### `complete`

```typescript
client.fileUpdateIntents.complete(id: string, data?: CompleteFileUpdateIntentRequest): Promise<unknown>
```

Marks a file update intent as complete.

Finalizes an intent after all file modifications are finished.
This releases locks and records the successful completion of
the update operation.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the intent |
| `data` | `CompleteFileUpdateIntentRequest` | No | Optional completion parameters |

**Returns:** `Promise<unknown>` — A promise that resolves when the intent is marked complete

[Full reference →](./complete)

---

### `create`

```typescript
client.fileUpdateIntents.create(data: CreateFileUpdateIntentRequest): Promise<FileUpdateIntent>
```

Creates a new file update intent.

Registers an intent to modify specified files on behalf of an agent.
The intent coordinates access to prevent conflicts with other
concurrent modifications.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateFileUpdateIntentRequest` | Yes | Request containing intent creation details |

**Returns:** `Promise<FileUpdateIntent>` — A promise that resolves to the created FileUpdateIntent object

[Full reference →](./create)

---

### `delete`

```typescript
client.fileUpdateIntents.delete(id: string): Promise<unknown>
```

Deletes a file update intent.

Removes the specified intent and releases any file locks it held.
Other agents will then be able to create intents for those files.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the intent to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when the intent has been deleted

[Full reference →](./delete)

---

### `get`

```typescript
client.fileUpdateIntents.get(id: string): Promise<FileUpdateIntent>
```

Retrieves a specific file update intent by its ID.

Returns detailed information about a single intent including its
current status, files, agent, and metadata.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the intent |

**Returns:** `Promise<FileUpdateIntent>` — A promise that resolves to the FileUpdateIntent object

[Full reference →](./get)

---

### `getBlockedFiles`

```typescript
client.fileUpdateIntents.getBlockedFiles(params?: Record<string, unknown>): Promise<BlockedFile[]>
```

Retrieves a list of currently blocked files.

Returns files that have active update intents, meaning they are
locked or being modified by other agents. Use this to identify
unavailable files before attempting modifications.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering blocked files |

**Returns:** `Promise<BlockedFile[]>` — A promise that resolves to an array of BlockedFile objects

[Full reference →](./getBlockedFiles)

---

### `getByAgent`

```typescript
client.fileUpdateIntents.getByAgent(agentId: string, params?: Record<string, unknown>): Promise<FileUpdateIntent[]>
```

Retrieves file update intents for a specific agent.

Returns all intents registered by a particular agent, including
their status, associated files, and metadata. Useful for monitoring
an agent's active operations.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agentId` | `string` | Yes | The unique identifier of the agent |
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering intents |

**Returns:** `Promise<FileUpdateIntent[]>` — A promise that resolves to an array of FileUpdateIntent objects

[Full reference →](./getByAgent)

---

### `getFilesWithIntents`

```typescript
client.fileUpdateIntents.getFilesWithIntents(params?: Record<string, unknown>): Promise<string[]>
```

Retrieves files that have active update intents.

Returns a list of file paths that currently have one or more
registered update intents. This is useful for quickly identifying
which files are in the process of being modified.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering |

**Returns:** `Promise<string[]>` — A promise that resolves to an array of file path strings

[Full reference →](./getFilesWithIntents)

---

### `list`

```typescript
client.fileUpdateIntents.list(params?: Record<string, unknown>): Promise<FileUpdateIntent[]>
```

Lists all file update intents in the system.

Returns every intent regardless of status or owning agent. Use this
for comprehensive intent monitoring or debugging coordination issues.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering intents |

**Returns:** `Promise<FileUpdateIntent[]>` — A promise that resolves to an array of FileUpdateIntent objects

[Full reference →](./list)

---

### `update`

```typescript
client.fileUpdateIntents.update(id: string, data: UpdateFileUpdateIntentRequest): Promise<FileUpdateIntent>
```

Updates an existing file update intent.

Modifies the properties, files, or status of an existing intent.
Use this to extend file ranges, update metadata, or change intent
configuration as operations progress.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the intent to update |
| `data` | `UpdateFileUpdateIntentRequest` | Yes | Request containing the intent updates to apply |

**Returns:** `Promise<FileUpdateIntent>` — A promise that resolves to the updated FileUpdateIntent object

[Full reference →](./update)

