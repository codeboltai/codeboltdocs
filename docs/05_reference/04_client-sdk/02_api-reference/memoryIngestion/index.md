---
title: MemoryIngestion API
---

# MemoryIngestion API

Memory Ingestion API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`activatePipeline`](./activatePipeline) | Activates a disabled ingestion pipeline. |
| [`createPipeline`](./createPipeline) | Creates a new ingestion pipeline with the specified processor chain. |
| [`deletePipeline`](./deletePipeline) | Permanently deletes an ingestion pipeline. |
| [`disablePipeline`](./disablePipeline) | Disables an active ingestion pipeline. |
| [`duplicatePipeline`](./duplicatePipeline) | Creates a copy of an existing ingestion pipeline. |
| [`executePipeline`](./executePipeline) | Manually triggers execution of an ingestion pipeline. |
| [`getEventSchema`](./getEventSchema) | Retrieves the schema for a specific ingestion event type. |
| [`getEventSchemas`](./getEventSchemas) | Retrieves all event schemas that define the structure of ingestion events. |
| [`getPipeline`](./getPipeline) | Retrieves a specific ingestion pipeline by its unique identifier. |
| [`getProcessors`](./getProcessors) | Retrieves all available processor types that can be used in pipelines. |
| [`listEvents`](./listEvents) | Lists ingestion events with optional filtering. |
| [`listPipelines`](./listPipelines) | Lists all ingestion pipelines with optional filtering. |
| [`updatePipeline`](./updatePipeline) | Updates an existing ingestion pipeline's configuration. |
| [`validate`](./validate) | Validates an ingestion pipeline configuration without creating or executing it. |

## Methods

---

### `activatePipeline`

```typescript
client.memoryIngestion.activatePipeline(id: string, data?: Record<string, unknown>): Promise<unknown>
```

Activates a disabled ingestion pipeline.

Enables the pipeline so it can be triggered by events or manual execution. A pipeline
must be activated before it will process any data.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the pipeline to activate |
| `data` | `Record<string, unknown>` | No | Optional activation parameters |

**Returns:** `Promise<unknown>` — A promise that resolves when the pipeline has been activated

[Full reference →](./activatePipeline)

---

### `createPipeline`

```typescript
client.memoryIngestion.createPipeline(data: CreateIngestionPipelineRequest): Promise<IngestionPipeline>
```

Creates a new ingestion pipeline with the specified processor chain.

Defines a new data processing workflow that can be triggered manually or automatically
in response to events. The pipeline chains processors together to transform data
before storing it in memory.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateIngestionPipelineRequest` | Yes | The pipeline creation payload |

**Returns:** `Promise<IngestionPipeline>` — A promise that resolves to the newly created pipeline

[Full reference →](./createPipeline)

---

### `deletePipeline`

```typescript
client.memoryIngestion.deletePipeline(id: string): Promise<unknown>
```

Permanently deletes an ingestion pipeline.

Removes the pipeline configuration. Previously ingested data is not affected.
The pipeline must be disabled before deletion.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the pipeline to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when the pipeline has been deleted

[Full reference →](./deletePipeline)

---

### `disablePipeline`

```typescript
client.memoryIngestion.disablePipeline(id: string, data?: Record<string, unknown>): Promise<unknown>
```

Disables an active ingestion pipeline.

Prevents the pipeline from being triggered or executed until it is reactivated.
Any in-progress executions may continue to completion.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the pipeline to disable |
| `data` | `Record<string, unknown>` | No | Optional deactivation parameters |

**Returns:** `Promise<unknown>` — A promise that resolves when the pipeline has been disabled

[Full reference →](./disablePipeline)

---

### `duplicatePipeline`

```typescript
client.memoryIngestion.duplicatePipeline(id: string, data?: DuplicateIngestionPipelineRequest): Promise<IngestionPipeline>
```

Creates a copy of an existing ingestion pipeline.

Duplicates the pipeline configuration, optionally with modifications. Useful for
creating variations of working pipelines without starting from scratch.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the pipeline to duplicate |
| `data` | `DuplicateIngestionPipelineRequest` | No | Optional modifications to apply to the duplicated pipeline |

**Returns:** `Promise<IngestionPipeline>` — A promise that resolves to the newly created duplicate pipeline

[Full reference →](./duplicatePipeline)

---

### `executePipeline`

```typescript
client.memoryIngestion.executePipeline(id: string, data?: ExecuteIngestionPipelineRequest): Promise<unknown>
```

Manually triggers execution of an ingestion pipeline.

Runs the pipeline's processor chain against the provided input data or its configured
data source. The execution is asynchronous; monitor progress through events.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the pipeline to execute |
| `data` | `ExecuteIngestionPipelineRequest` | No | Optional execution parameters and input data |

**Returns:** `Promise<unknown>` — A promise that resolves when the execution has been initiated

[Full reference →](./executePipeline)

---

### `getEventSchema`

```typescript
client.memoryIngestion.getEventSchema(eventType: string): Promise<IngestionEventSchema>
```

Retrieves the schema for a specific ingestion event type.

Returns the field definitions and validation rules for a single event type,
useful for building event handlers or display components.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `eventType` | `string` | Yes | The event type identifier to get the schema for |

**Returns:** `Promise<IngestionEventSchema>` — A promise that resolves to the event schema definition

[Full reference →](./getEventSchema)

---

### `getEventSchemas`

```typescript
client.memoryIngestion.getEventSchemas(): Promise<IngestionEventSchema[]>
```

Retrieves all event schemas that define the structure of ingestion events.

Returns the schema definitions for each event type emitted by the ingestion system,
describing the fields and data types contained in each event.

_No parameters._

**Returns:** `Promise<IngestionEventSchema[]>` — A promise that resolves to an array of event schema definitions

[Full reference →](./getEventSchemas)

---

### `getPipeline`

```typescript
client.memoryIngestion.getPipeline(id: string): Promise<IngestionPipeline>
```

Retrieves a specific ingestion pipeline by its unique identifier.

Returns the full pipeline configuration including its processor chain, trigger
conditions, and execution history.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the pipeline to retrieve |

**Returns:** `Promise<IngestionPipeline>` — A promise that resolves to the ingestion pipeline details

[Full reference →](./getPipeline)

---

### `getProcessors`

```typescript
client.memoryIngestion.getProcessors(): Promise<IngestionProcessor[]>
```

Retrieves all available processor types that can be used in pipelines.

Returns the catalog of processors (text splitters, embedders, classifiers, etc.)
that can be chained together in ingestion pipelines.

_No parameters._

**Returns:** `Promise<IngestionProcessor[]>` — A promise that resolves to an array of available processor definitions

[Full reference →](./getProcessors)

---

### `listEvents`

```typescript
client.memoryIngestion.listEvents(params?: Record<string, unknown>): Promise<IngestionEvent[]>
```

Lists ingestion events with optional filtering.

Returns records of ingestion pipeline executions, including success/failure status,
processing metrics, and error details. Useful for monitoring and debugging pipelines.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering events |

**Returns:** `Promise<IngestionEvent[]>` — A promise that resolves to an array of ingestion events

[Full reference →](./listEvents)

---

### `listPipelines`

```typescript
client.memoryIngestion.listPipelines(params?: Record<string, unknown>): Promise<IngestionPipeline[]>
```

Lists all ingestion pipelines with optional filtering.

Returns the collection of configured ingestion pipelines. Each pipeline defines a
sequence of processing steps for transforming raw data into memory entries.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering and pagination |

**Returns:** `Promise<IngestionPipeline[]>` — A promise that resolves to an array of ingestion pipelines

[Full reference →](./listPipelines)

---

### `updatePipeline`

```typescript
client.memoryIngestion.updatePipeline(id: string, data: UpdateIngestionPipelineRequest): Promise<IngestionPipeline>
```

Updates an existing ingestion pipeline's configuration.

Modifies the pipeline's processor chain, triggers, or metadata. Changes affect
subsequent executions but do not alter previously ingested data.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the pipeline to update |
| `data` | `UpdateIngestionPipelineRequest` | Yes | The fields to update on the pipeline |

**Returns:** `Promise<IngestionPipeline>` — A promise that resolves to the updated pipeline

[Full reference →](./updatePipeline)

---

### `validate`

```typescript
client.memoryIngestion.validate(data: ValidateIngestionPipelineRequest): Promise<unknown>
```

Validates an ingestion pipeline configuration without creating or executing it.

Checks that the pipeline definition is well-formed, all referenced processors exist,
and the processor chain is compatible. Use this to catch errors before saving.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ValidateIngestionPipelineRequest` | Yes | The pipeline configuration to validate |

**Returns:** `Promise<unknown>` — A promise that resolves to the validation result

[Full reference →](./validate)

