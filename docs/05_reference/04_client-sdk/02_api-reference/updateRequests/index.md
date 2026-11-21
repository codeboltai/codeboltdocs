---
title: UpdateRequests API
---

# UpdateRequests API

Update Requests API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`addDispute`](./addDispute) | Add a dispute to a request |
| [`addDisputeComment`](./addDisputeComment) | Add a comment to a dispute |
| [`addWatcher`](./addWatcher) | Add a watcher to a request |
| [`completeWork`](./completeWork) | Complete work on a request |
| [`create`](./create) | Create a new update request |
| [`delete`](./delete) | Delete an update request |
| [`get`](./get) | Get a single update request |
| [`list`](./list) | List all update requests |
| [`merge`](./merge) | Merge a request into project structure |
| [`removeWatcher`](./removeWatcher) | Remove a watcher from a request |
| [`resolveDispute`](./resolveDispute) | Resolve a dispute |
| [`startWork`](./startWork) | Start working on a request |
| [`submit`](./submit) | Submit a request for review |
| [`update`](./update) | Update an existing request |

## Methods

---

### `addDispute`

```typescript
client.updateRequests.addDispute(id: string, data: AddDisputeRequest): Promise<unknown>
```

Add a dispute to a request

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes |  |
| `data` | `AddDisputeRequest` | Yes |  |

**Returns:** `Promise<unknown>`

[Full reference →](./addDispute)

---

### `addDisputeComment`

```typescript
client.updateRequests.addDisputeComment(id: string, disputeId: string, data: AddDisputeCommentRequest): Promise<unknown>
```

Add a comment to a dispute

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes |  |
| `disputeId` | `string` | Yes |  |
| `data` | `AddDisputeCommentRequest` | Yes |  |

**Returns:** `Promise<unknown>`

[Full reference →](./addDisputeComment)

---

### `addWatcher`

```typescript
client.updateRequests.addWatcher(id: string, data: AddWatcherRequest): Promise<unknown>
```

Add a watcher to a request

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes |  |
| `data` | `AddWatcherRequest` | Yes |  |

**Returns:** `Promise<unknown>`

[Full reference →](./addWatcher)

---

### `completeWork`

```typescript
client.updateRequests.completeWork(id: string, data?: CompleteWorkRequest): Promise<unknown>
```

Complete work on a request

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes |  |
| `data` | `CompleteWorkRequest` | No |  |

**Returns:** `Promise<unknown>`

[Full reference →](./completeWork)

---

### `create`

```typescript
client.updateRequests.create(data: CreateUpdateRequestRequest): Promise<UpdateRequest>
```

Create a new update request

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateUpdateRequestRequest` | Yes |  |

**Returns:** `Promise<UpdateRequest>`

[Full reference →](./create)

---

### `delete`

```typescript
client.updateRequests.delete(id: string): Promise<unknown>
```

Delete an update request

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes |  |

**Returns:** `Promise<unknown>`

[Full reference →](./delete)

---

### `get`

```typescript
client.updateRequests.get(id: string): Promise<UpdateRequest>
```

Get a single update request

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes |  |

**Returns:** `Promise<UpdateRequest>`

[Full reference →](./get)

---

### `list`

```typescript
client.updateRequests.list(params?: Record<string, unknown>): Promise<UpdateRequest[]>
```

List all update requests

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No |  |

**Returns:** `Promise<UpdateRequest[]>`

[Full reference →](./list)

---

### `merge`

```typescript
client.updateRequests.merge(id: string, data?: MergeUpdateRequestRequest): Promise<unknown>
```

Merge a request into project structure

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes |  |
| `data` | `MergeUpdateRequestRequest` | No |  |

**Returns:** `Promise<unknown>`

[Full reference →](./merge)

---

### `removeWatcher`

```typescript
client.updateRequests.removeWatcher(id: string, watcherId: string): Promise<unknown>
```

Remove a watcher from a request

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes |  |
| `watcherId` | `string` | Yes |  |

**Returns:** `Promise<unknown>`

[Full reference →](./removeWatcher)

---

### `resolveDispute`

```typescript
client.updateRequests.resolveDispute(id: string, disputeId: string, data: ResolveDisputeRequest): Promise<unknown>
```

Resolve a dispute

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes |  |
| `disputeId` | `string` | Yes |  |
| `data` | `ResolveDisputeRequest` | Yes |  |

**Returns:** `Promise<unknown>`

[Full reference →](./resolveDispute)

---

### `startWork`

```typescript
client.updateRequests.startWork(id: string): Promise<unknown>
```

Start working on a request

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes |  |

**Returns:** `Promise<unknown>`

[Full reference →](./startWork)

---

### `submit`

```typescript
client.updateRequests.submit(id: string): Promise<unknown>
```

Submit a request for review

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes |  |

**Returns:** `Promise<unknown>`

[Full reference →](./submit)

---

### `update`

```typescript
client.updateRequests.update(id: string, data: UpdateUpdateRequestRequest): Promise<UpdateRequest>
```

Update an existing request

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes |  |
| `data` | `UpdateUpdateRequestRequest` | Yes |  |

**Returns:** `Promise<UpdateRequest>`

[Full reference →](./update)

