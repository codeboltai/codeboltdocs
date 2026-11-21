---
title: ThreadSteps API
---

# ThreadSteps API

Thread Steps API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`bulkDelete`](./bulkDelete) | Bulk delete steps |
| [`bulkUpdate`](./bulkUpdate) | Bulk update steps |
| [`complete`](./complete) | Complete a step |
| [`create`](./create) | Create a new step |
| [`delete`](./delete) | Delete a step |
| [`execute`](./execute) | Execute a step |
| [`fail`](./fail) | Mark a step as failed |
| [`getActiveSteps`](./getActiveSteps) | Get active steps for a thread |
| [`getById`](./getById) | Get a step by internal ID |
| [`getByThreadId`](./getByThreadId) | Get steps by thread ID |
| [`getNextExecutable`](./getNextExecutable) | Get next executable step for a thread |
| [`getStatistics`](./getStatistics) | Get step statistics for a thread |
| [`healthCheck`](./healthCheck) | Health check for thread step service |
| [`list`](./list) | List all steps |
| [`search`](./search) | Search for a step by stepId |
| [`skip`](./skip) | Skip a step |
| [`update`](./update) | Update a step |
| [`updateStatus`](./updateStatus) | Update step status |

## Methods

---

### `bulkDelete`

```typescript
client.threadSteps.bulkDelete(data: BulkDeleteStepsRequest): Promise<void>
```

Bulk delete steps

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `BulkDeleteStepsRequest` | Yes |  |

**Returns:** `Promise<void>`

[Full reference →](./bulkDelete)

---

### `bulkUpdate`

```typescript
client.threadSteps.bulkUpdate(data: BulkUpdateStepsRequest): Promise<void>
```

Bulk update steps

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `BulkUpdateStepsRequest` | Yes |  |

**Returns:** `Promise<void>`

[Full reference →](./bulkUpdate)

---

### `complete`

```typescript
client.threadSteps.complete(stepId: string, data?: CompleteStepRequest): Promise<ThreadStep>
```

Complete a step

| Parameter | Type | Required | Description |
|---|---|---|---|
| `stepId` | `string` | Yes |  |
| `data` | `CompleteStepRequest` | No |  |

**Returns:** `Promise<ThreadStep>`

[Full reference →](./complete)

---

### `create`

```typescript
client.threadSteps.create(data: CreateStepRequest): Promise<ThreadStep>
```

Create a new step

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateStepRequest` | Yes |  |

**Returns:** `Promise<ThreadStep>`

[Full reference →](./create)

---

### `delete`

```typescript
client.threadSteps.delete(stepId: string): Promise<void>
```

Delete a step

| Parameter | Type | Required | Description |
|---|---|---|---|
| `stepId` | `string` | Yes |  |

**Returns:** `Promise<void>`

[Full reference →](./delete)

---

### `execute`

```typescript
client.threadSteps.execute(stepId: string, data?: ExecuteStepRequest): Promise<ThreadStep>
```

Execute a step

| Parameter | Type | Required | Description |
|---|---|---|---|
| `stepId` | `string` | Yes |  |
| `data` | `ExecuteStepRequest` | No |  |

**Returns:** `Promise<ThreadStep>`

[Full reference →](./execute)

---

### `fail`

```typescript
client.threadSteps.fail(stepId: string, data?: FailStepRequest): Promise<ThreadStep>
```

Mark a step as failed

| Parameter | Type | Required | Description |
|---|---|---|---|
| `stepId` | `string` | Yes |  |
| `data` | `FailStepRequest` | No |  |

**Returns:** `Promise<ThreadStep>`

[Full reference →](./fail)

---

### `getActiveSteps`

```typescript
client.threadSteps.getActiveSteps(threadId: string): Promise<ThreadStep[]>
```

Get active steps for a thread

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes |  |

**Returns:** `Promise<ThreadStep[]>`

[Full reference →](./getActiveSteps)

---

### `getById`

```typescript
client.threadSteps.getById(id: string): Promise<ThreadStep>
```

Get a step by internal ID

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes |  |

**Returns:** `Promise<ThreadStep>`

[Full reference →](./getById)

---

### `getByThreadId`

```typescript
client.threadSteps.getByThreadId(threadId: string): Promise<ThreadStep[]>
```

Get steps by thread ID

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes |  |

**Returns:** `Promise<ThreadStep[]>`

[Full reference →](./getByThreadId)

---

### `getNextExecutable`

```typescript
client.threadSteps.getNextExecutable(threadId: string): Promise<ThreadStep | null>
```

Get next executable step for a thread

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes |  |

**Returns:** `Promise<ThreadStep | null>`

[Full reference →](./getNextExecutable)

---

### `getStatistics`

```typescript
client.threadSteps.getStatistics(threadId: string): Promise<StepStatistics>
```

Get step statistics for a thread

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes |  |

**Returns:** `Promise<StepStatistics>`

[Full reference →](./getStatistics)

---

### `healthCheck`

```typescript
client.threadSteps.healthCheck(): Promise<HealthCheckResponse>
```

Health check for thread step service

_No parameters._

**Returns:** `Promise<HealthCheckResponse>`

[Full reference →](./healthCheck)

---

### `list`

```typescript
client.threadSteps.list(params?: StepListParams): Promise<ThreadStep[]>
```

List all steps

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `StepListParams` | No |  |

**Returns:** `Promise<ThreadStep[]>`

[Full reference →](./list)

---

### `search`

```typescript
client.threadSteps.search(stepId: string): Promise<ThreadStep>
```

Search for a step by stepId

| Parameter | Type | Required | Description |
|---|---|---|---|
| `stepId` | `string` | Yes |  |

**Returns:** `Promise<ThreadStep>`

[Full reference →](./search)

---

### `skip`

```typescript
client.threadSteps.skip(stepId: string, data?: SkipStepRequest): Promise<ThreadStep>
```

Skip a step

| Parameter | Type | Required | Description |
|---|---|---|---|
| `stepId` | `string` | Yes |  |
| `data` | `SkipStepRequest` | No |  |

**Returns:** `Promise<ThreadStep>`

[Full reference →](./skip)

---

### `update`

```typescript
client.threadSteps.update(stepId: string, data: UpdateStepRequest): Promise<ThreadStep>
```

Update a step

| Parameter | Type | Required | Description |
|---|---|---|---|
| `stepId` | `string` | Yes |  |
| `data` | `UpdateStepRequest` | Yes |  |

**Returns:** `Promise<ThreadStep>`

[Full reference →](./update)

---

### `updateStatus`

```typescript
client.threadSteps.updateStatus(stepId: string, data: UpdateStepStatusRequest): Promise<ThreadStep>
```

Update step status

| Parameter | Type | Required | Description |
|---|---|---|---|
| `stepId` | `string` | Yes |  |
| `data` | `UpdateStepStatusRequest` | Yes |  |

**Returns:** `Promise<ThreadStep>`

[Full reference →](./updateStatus)

