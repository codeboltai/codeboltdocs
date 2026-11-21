---
title: EventLog API
---

# EventLog API

Event Log API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`createEvent`](./createEvent) | Creates a new event within an event log instance. |
| [`createEventsBatch`](./createEventsBatch) | Creates multiple events in a single batch operation. |
| [`createInstance`](./createInstance) | Creates a new event log instance. |
| [`deleteInstance`](./deleteInstance) | Deletes an event log instance and all its associated events. |
| [`getInstance`](./getInstance) | Retrieves a specific event log instance by its ID. |
| [`listInstances`](./listInstances) | Lists all event log instances. |
| [`query`](./query) | Queries events using filter criteria. |
| [`updateInstance`](./updateInstance) | Updates an existing event log instance. |

## Methods

---

### `createEvent`

```typescript
client.eventLog.createEvent(data: CreateEventLogEventRequest): Promise<EventLogEvent>
```

Creates a new event within an event log instance.

Records a single event with its type, payload, and timestamp. Events
are immutable once created.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateEventLogEventRequest` | Yes | Event creation payload including instance ID, type, and data |

**Returns:** `Promise<EventLogEvent>` — A promise that resolves to the newly created

[Full reference →](./createEvent)

---

### `createEventsBatch`

```typescript
client.eventLog.createEventsBatch(data: CreateEventLogEventRequest[]): Promise<EventLogEvent[]>
```

Creates multiple events in a single batch operation.

More efficient than creating events one at a time when you have
multiple events to record simultaneously.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateEventLogEventRequest[]` | Yes | An array of event creation payloads |

**Returns:** `Promise<EventLogEvent[]>` — A promise that resolves to an array of the created  objects

[Full reference →](./createEventsBatch)

---

### `createInstance`

```typescript
client.eventLog.createInstance(data: CreateEventLogInstanceRequest): Promise<EventLogInstance>
```

Creates a new event log instance.

An event log instance acts as a container that groups related events
together. Create one per logical context (e.g., per agent session or workflow).

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateEventLogInstanceRequest` | Yes | Instance creation payload including name and configuration |

**Returns:** `Promise<EventLogInstance>` — A promise that resolves to the newly created

[Full reference →](./createInstance)

---

### `deleteInstance`

```typescript
client.eventLog.deleteInstance(id: string): Promise<unknown>
```

Deletes an event log instance and all its associated events.

Permanently removes the instance. This action cannot be undone.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the event log instance to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when deletion is complete

[Full reference →](./deleteInstance)

---

### `getInstance`

```typescript
client.eventLog.getInstance(id: string): Promise<EventLogInstance>
```

Retrieves a specific event log instance by its ID.

Returns the full details of a single event log instance including
its metadata and configuration.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the event log instance |

**Returns:** `Promise<EventLogInstance>` — A promise that resolves to the

[Full reference →](./getInstance)

---

### `listInstances`

```typescript
client.eventLog.listInstances(params?: Record<string, unknown>): Promise<EventLogInstance[]>
```

Lists all event log instances.

Returns every event log instance in the system. Use optional parameters
to filter or paginate the results.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

**Returns:** `Promise<EventLogInstance[]>` — A promise that resolves to an array of  objects

[Full reference →](./listInstances)

---

### `query`

```typescript
client.eventLog.query(data: EventLogQueryRequest): Promise<EventLogEvent[]>
```

Queries events using filter criteria.

Searches across event log instances to find events matching specific
types, time ranges, or other filter conditions.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `EventLogQueryRequest` | Yes | Query parameters specifying filters and sorting |

**Returns:** `Promise<EventLogEvent[]>` — A promise that resolves to an array of matching  objects

[Full reference →](./query)

---

### `updateInstance`

```typescript
client.eventLog.updateInstance(id: string, data: UpdateEventLogInstanceRequest): Promise<EventLogInstance>
```

Updates an existing event log instance.

Modifies the instance's properties such as name, description, or
configuration settings.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the event log instance to update |
| `data` | `UpdateEventLogInstanceRequest` | Yes | The fields to update |

**Returns:** `Promise<EventLogInstance>` — A promise that resolves to the updated

[Full reference →](./updateInstance)

