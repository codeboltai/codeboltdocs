---
sidebar_position: 2.6
title: Memory Ingestion
description: Memory Ingestion provides event-driven write-path pipelines that transform application data and route it into storage layers
---

# Memory Ingestion

Memory Ingestion provides event-driven write-path pipelines that transform application data and route it into storage layers. Pipelines trigger on application events (conversation end, task completion, git commit, etc.) and execute a sequential processor chain followed by routing rules that write results to destinations.

![Memory Ingestion](/productImages/memorycontext/memoryingestion.png)

## Storage

Pipeline definitions are stored as individual JSON files:

```
{projectPath}/.codebolt/MemoryIngestion/{id}.json
```

Each file contains a complete `IngestionPipeline` definition.

## Pipeline Definition Structure

```yaml
id: string
label: string
description: string
version: string
status: 'active' | 'disabled' | 'draft'
trigger: IngestionTrigger
trigger_config: object       # filter conditions
processors: IngestionProcessor[]
routing: RoutingRule[]
```

## Trigger Types

The trigger picker includes application events and manual execution. Common triggers include the following.

| Trigger | Fires when |
|---|---|
| `onConversationEnd` | A chat thread completes |
| `onConversationStart` | A chat thread opens |
| `onTaskStart` | A task begins |
| `onTaskCompleted` | A task finishes successfully |
| `onTaskFailure` | A task fails |
| `onAction` | A specific agent action occurs |
| `onError` | An error occurs |
| `manual` | Triggered only via API |

## Event Bridge Architecture

The `memoryIngestionEventBridge` connects the Application Event Bus to pipelines. The flow works as follows:

1. **On pipeline activation** -- `subscribePipeline()` registers with the Application Event Bus.
2. **When event fires** -- The bridge receives an `ApplicationEvent`.
3. **Data resolution** -- `eventDataResolverService.resolveEventData()` enriches the event with domain data (fetches full job, thread, task details from services).
4. **Conversion** -- Resolved data is converted to `EnrichedIngestionEventData` with a flattened payload.
5. **Emission** -- `bridgeEvents.emit('enrichedEvent', { pipelineId, event })` triggers pipeline execution.

### Built-in Resolvers

| Resolver | Behavior |
|---|---|
| Job resolver | Fetches full job + pheromones |
| Conversation start/end resolvers | Fetches thread + messages |
| Message added resolver | Fetches specific message |
| Task resolver | Fetches task details |
| Passthrough resolver | For agent, swarm, file, git events (passes payload as-is) |

## The 8 Processor Types

### 1. blob_store (Storage)

Produces a reference with a bucket and key. The processor does not persist the raw bytes.

- **Returns:** `{ ref: { bucket, key, timestamp, size } }`
- **Params:** `bucket`, `metadata`

### 2. chunker (Transform)

Splits text into chunks with overlap. Handles strings, arrays of strings, and objects with text/content fields.

- **Returns:** Array of `{ text, index, metadata: { originalLength, chunkSize, overlap } }`
- **Params:** `chunk_size` (default 400), `overlap` (default 50), `separator`

### 3. vector_embed (Transform)

Produces random 384-dimensional vectors. For similarity search, route the source text to a vector collection so the Vector DB can index it with its embedding provider.

- **Params:** `model`, `batch_size`

### 4. llm_extract (Extraction)

Calls an LLM to extract structured entities from input. Builds a prompt from a template plus input data, parses the JSON response, and handles markdown code blocks in the response.

- **Returns:** Extracted data with `_metadata: { model, promptTokens, completionTokens }`
- **Params:** `prompt_template`, `output_schema`, `model`, `temperature`, `max_tokens`

### 5. llm_extract_kb (Extraction)

Extracts entities for the Knowledge Base with optional Knowledge Graph template integration. If `kg_template_id` is provided, the template schema is included in the prompt for structured extraction.

- **Returns:** `{ nodes[], edges[], _metadata }`
- **Params:** `prompt`, `output_format`, `kg_template_id`

### 6. parser (Transform)

Parses JSON strings. To select a nested value after parsing, use a path such as `event.payload.review.id`.

- **Params:** `format` (JSON parsing is implemented), `path`

### 7. normalizer (Transform)

Cleans and normalizes data. Operations include lowercasing strings, trimming whitespace, and recursively removing null/undefined values.

- **Params:** `lowercase`, `trim`, `remove_nulls`

### 8. custom (Custom)

:::caution Not yet implemented
The custom processor is registered as a type but all three execution modes are currently stubbed out in the ingestion pipeline — they log a message and return an empty object. Custom steps **do** work in [Persistent Memory](./02d_persistent-memory.md) retrieval pipelines (actionBlockPath and inlineCode via SideExecutionManager).
:::

## Routing Engine

After processors complete, routing rules direct outputs to storage destinations.

### Routing Rule Structure

```typescript
{
  from: string,          // processor output name
  foreach?: boolean,     // iterate over array items
  condition?: string,    // recorded but not evaluated
  write_to: WriteDestination
}
```

### Write Destinations

#### 1. graph (Knowledge Graph)

Resolves an instance by name or ID. Handles both single records and arrays. For each item, creates a node via `addMemoryRecord` with kind, name, and attributes. If edges are present, creates edges via `addEdge`. Bulk operations are supported for arrays.

#### 2. vector (Vector Database)

Resolves a collection by name or ID. Upserts a document using the item’s `id` or `uri`, or a generated UUID, text from the content/text field, and metadata from the data object.

#### 3. kv (Key-Value Store)

Resolves an instance by name or ID (auto-creates via `ensureInstance`). Supports `key_template` with variable substitution. Stores the value via `kvStoreDataService.set()`.

#### 4. blob (Blob Storage)

Placeholder in the current implementation.

- **Config:** `bucket`, `path_template`

#### 5. log (Event Log)

Resolves an instance by name or ID (auto-creates via `ensureInstance`). Appends an event with `event_type` from the destination config. The payload is the routed data.

## Pipeline Execution Flow

```
1. Load pipeline definition
2. Build IngestionEventData from input
3. For each processor (sequential):
   a. Resolve input (from event payload or previous output)
   b. Execute processor handler
   c. Store output in outputs map
   d. Emit 'processor-completed' event
4. Execute routing rules:
   a. For each rule: get data from outputs[rule.from]
   b. If foreach: iterate items, write each
   c. Routing proceeds even when a condition is supplied
   d. Call writeToDestination()
5. Return PipelineExecutionResult with processor results,
   routing results, and timing
```

## Validation

`validatePipeline()` performs the following checks:

- **Required fields:** `id`, `label`, `trigger`
- **Processors:** Valid type, has `id` and `output`, type-specific parameter validation
- **Routing:** Valid `from` reference, valid destination type, required destination fields

Returns `{ valid, errors[], warnings[] }`.

## Pipeline Lifecycle

| Operation | Behavior |
|---|---|
| **Create** | Validates, saves file, subscribes to event bus if active |
| **Update** | Re-subscribes if trigger changes, unsubscribes if deactivated |
| **Delete** | Unsubscribes from event bus, removes file |
| **Activate / Disable** | Changes status, manages event bus subscription |
| **Duplicate** | Deep copy with new ID and optional new label |

## WebSocket Events

- `memoryIngestion:created` / `memoryIngestion:updated` / `memoryIngestion:deleted`
- `memoryIngestion:execution-started`
- `memoryIngestion:execution-completed`
- `memoryIngestion:processor-completed`

## REST API

### Pipeline CRUD

| Method | Endpoint |
|---|---|
| `GET` | `/memory-ingestion/pipelines` |
| `POST` | `/memory-ingestion/pipelines` |
| `GET` | `/memory-ingestion/pipelines/:id` |
| `PUT` | `/memory-ingestion/pipelines/:id` |
| `DELETE` | `/memory-ingestion/pipelines/:id` |

### Pipeline Actions

| Method | Endpoint |
|---|---|
| `POST` | `/memory-ingestion/pipelines/:id/execute` |
| `POST` | `/memory-ingestion/pipelines/:id/activate` |
| `POST` | `/memory-ingestion/pipelines/:id/disable` |
| `POST` | `/memory-ingestion/pipelines/:id/duplicate` |

### Metadata and Validation

| Method | Endpoint |
|---|---|
| `POST` | `/memory-ingestion/validate` |
| `GET` | `/memory-ingestion/processors` |
| `GET` | `/memory-ingestion/events` |
| `GET` | `/memory-ingestion/events/schemas` |
| `GET` | `/memory-ingestion/events/schemas/:eventType` |
