---
title: TaskActivity API
---

# TaskActivity API

Task Activity API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`bulkCreate`](./bulkCreate) | Bulk create activities |
| [`create`](./create) | Create a new task activity |
| [`createPrestart`](./createPrestart) | Create a prestart activity |
| [`delete`](./delete) | Delete a task activity |
| [`deleteOlder`](./deleteOlder) | Delete older activities (cleanup) |
| [`get`](./get) | Get a specific task activity |
| [`getByStatus`](./getByStatus) | Get activities by status |
| [`getByThread`](./getByThread) | Get activities by thread ID |
| [`getByType`](./getByType) | Get activities by type |
| [`getDetailsWithActivities`](./getDetailsWithActivities) | Get task details with activities |
| [`getRecent`](./getRecent) | Get recent activities |
| [`getStatistics`](./getStatistics) | Get activity statistics overview |
| [`list`](./list) | List all task activities |
| [`update`](./update) | Update a task activity |

## Methods

---

### `bulkCreate`

```typescript
client.taskActivity.bulkCreate(data: CreateTaskActivityRequest[]): Promise<TaskActivity[]>
```

Bulk create activities

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateTaskActivityRequest[]` | Yes |  |

**Returns:** `Promise<TaskActivity[]>`

[Full reference →](./bulkCreate)

---

### `create`

```typescript
client.taskActivity.create(data: CreateTaskActivityRequest): Promise<TaskActivity>
```

Create a new task activity

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateTaskActivityRequest` | Yes |  |

**Returns:** `Promise<TaskActivity>`

[Full reference →](./create)

---

### `createPrestart`

```typescript
client.taskActivity.createPrestart(data: CreatePrestartActivityRequest): Promise<TaskActivity>
```

Create a prestart activity

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreatePrestartActivityRequest` | Yes |  |

**Returns:** `Promise<TaskActivity>`

[Full reference →](./createPrestart)

---

### `delete`

```typescript
client.taskActivity.delete(taskId: string): Promise<void>
```

Delete a task activity

| Parameter | Type | Required | Description |
|---|---|---|---|
| `taskId` | `string` | Yes |  |

**Returns:** `Promise<void>`

[Full reference →](./delete)

---

### `deleteOlder`

```typescript
client.taskActivity.deleteOlder(params?: TaskActivityCleanupParams): Promise<void>
```

Delete older activities (cleanup)

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `TaskActivityCleanupParams` | No |  |

**Returns:** `Promise<void>`

[Full reference →](./deleteOlder)

---

### `get`

```typescript
client.taskActivity.get(taskId: string): Promise<TaskActivity>
```

Get a specific task activity

| Parameter | Type | Required | Description |
|---|---|---|---|
| `taskId` | `string` | Yes |  |

**Returns:** `Promise<TaskActivity>`

[Full reference →](./get)

---

### `getByStatus`

```typescript
client.taskActivity.getByStatus(status: string): Promise<TaskActivity[]>
```

Get activities by status

| Parameter | Type | Required | Description |
|---|---|---|---|
| `status` | `string` | Yes |  |

**Returns:** `Promise<TaskActivity[]>`

[Full reference →](./getByStatus)

---

### `getByThread`

```typescript
client.taskActivity.getByThread(threadId: string): Promise<TaskActivity[]>
```

Get activities by thread ID

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes |  |

**Returns:** `Promise<TaskActivity[]>`

[Full reference →](./getByThread)

---

### `getByType`

```typescript
client.taskActivity.getByType(type: string): Promise<TaskActivity[]>
```

Get activities by type

| Parameter | Type | Required | Description |
|---|---|---|---|
| `type` | `string` | Yes |  |

**Returns:** `Promise<TaskActivity[]>`

[Full reference →](./getByType)

---

### `getDetailsWithActivities`

```typescript
client.taskActivity.getDetailsWithActivities(taskId: string): Promise<TaskDetailsWithActivities>
```

Get task details with activities

| Parameter | Type | Required | Description |
|---|---|---|---|
| `taskId` | `string` | Yes |  |

**Returns:** `Promise<TaskDetailsWithActivities>`

[Full reference →](./getDetailsWithActivities)

---

### `getRecent`

```typescript
client.taskActivity.getRecent(): Promise<TaskActivity[]>
```

Get recent activities

_No parameters._

**Returns:** `Promise<TaskActivity[]>`

[Full reference →](./getRecent)

---

### `getStatistics`

```typescript
client.taskActivity.getStatistics(): Promise<TaskActivityStatistics>
```

Get activity statistics overview

_No parameters._

**Returns:** `Promise<TaskActivityStatistics>`

[Full reference →](./getStatistics)

---

### `list`

```typescript
client.taskActivity.list(params?: TaskActivityListParams): Promise<TaskActivity[]>
```

List all task activities

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `TaskActivityListParams` | No |  |

**Returns:** `Promise<TaskActivity[]>`

[Full reference →](./list)

---

### `update`

```typescript
client.taskActivity.update(taskId: string, data: UpdateTaskActivityRequest): Promise<TaskActivity>
```

Update a task activity

| Parameter | Type | Required | Description |
|---|---|---|---|
| `taskId` | `string` | Yes |  |
| `data` | `UpdateTaskActivityRequest` | Yes |  |

**Returns:** `Promise<TaskActivity>`

[Full reference →](./update)

