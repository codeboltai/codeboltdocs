---
title: KnowledgeGraph API
---

# KnowledgeGraph API

Knowledge Graph API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`createEdge`](./createEdge) | Creates a new edge (relationship) in a knowledge graph instance. |
| [`createInstance`](./createInstance) | Creates a new knowledge graph instance. |
| [`createInstanceTemplate`](./createInstanceTemplate) | Creates a new knowledge graph instance template. |
| [`createRecord`](./createRecord) | Creates a new record (node) in a knowledge graph instance. |
| [`createView`](./createView) | Creates a new view for querying a knowledge graph. |
| [`createViewTemplate`](./createViewTemplate) | Creates a new view template for knowledge graphs. |
| [`deleteEdge`](./deleteEdge) | Deletes an edge from a knowledge graph instance. |
| [`deleteInstance`](./deleteInstance) | Deletes a knowledge graph instance and all its data. |
| [`deleteInstanceTemplate`](./deleteInstanceTemplate) | Deletes a knowledge graph instance template. |
| [`deleteRecord`](./deleteRecord) | Deletes a record from a knowledge graph instance. |
| [`deleteView`](./deleteView) | Deletes a view. |
| [`deleteViewTemplate`](./deleteViewTemplate) | Deletes a view template. |
| [`executeView`](./executeView) | Executes a view and returns the query results. |
| [`expandNode`](./expandNode) | Expands a node to reveal its immediate connections. |
| [`getInstance`](./getInstance) | Retrieves a specific knowledge graph instance by its ID. |
| [`getInstanceTemplate`](./getInstanceTemplate) | Retrieves a specific knowledge graph instance template by its ID. |
| [`getRecord`](./getRecord) | Retrieves a specific record from a knowledge graph instance. |
| [`getSubgraph`](./getSubgraph) | Retrieves a subgraph of a knowledge graph instance. |
| [`getViewTemplate`](./getViewTemplate) | Retrieves a specific view template by its ID. |
| [`listEdges`](./listEdges) | Lists all edges in a knowledge graph instance. |
| [`listInstances`](./listInstances) | Lists all knowledge graph instances. |
| [`listInstanceTemplates`](./listInstanceTemplates) | Lists all knowledge graph instance templates. |
| [`listRecords`](./listRecords) | Lists all records in a knowledge graph instance. |
| [`listViews`](./listViews) | Lists all knowledge graph views. |
| [`listViewTemplates`](./listViewTemplates) | Lists all knowledge graph view templates. |
| [`updateInstanceTemplate`](./updateInstanceTemplate) | Updates a knowledge graph instance template. |
| [`updateRecord`](./updateRecord) | Updates a record in a knowledge graph instance. |
| [`updateViewTemplate`](./updateViewTemplate) | Updates a view template. |

## Methods

---

### `createEdge`

```typescript
client.knowledgeGraph.createEdge(id: string, data: CreateKGEdgeRequest): Promise<KGEdge>
```

Creates a new edge (relationship) in a knowledge graph instance.

Edges connect two records with a typed relationship, forming the
graph structure. Each edge has a source record, target record,
and relationship type.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the graph instance |
| `data` | `CreateKGEdgeRequest` | Yes | Edge creation payload including source, target, and relationship type |

**Returns:** `Promise<KGEdge>` — A promise that resolves to the newly created

[Full reference →](./createEdge)

---

### `createInstance`

```typescript
client.knowledgeGraph.createInstance(data: CreateKGInstanceRequest): Promise<KGInstance>
```

Creates a new knowledge graph instance.

Provisions an empty graph that can be populated with records and edges.
Optionally created from a template to inherit schema constraints.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateKGInstanceRequest` | Yes | Instance creation payload including name and optional template reference |

**Returns:** `Promise<KGInstance>` — A promise that resolves to the newly created

[Full reference →](./createInstance)

---

### `createInstanceTemplate`

```typescript
client.knowledgeGraph.createInstanceTemplate(data: CreateKGInstanceTemplateRequest): Promise<KGInstanceTemplate>
```

Creates a new knowledge graph instance template.

Templates define the schema and structure for knowledge graph instances.
Use templates to enforce consistent node types and edge patterns
across multiple graph instances.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateKGInstanceTemplateRequest` | Yes | Template creation payload including schema definition |

**Returns:** `Promise<KGInstanceTemplate>` — A promise that resolves to the newly created

[Full reference →](./createInstanceTemplate)

---

### `createRecord`

```typescript
client.knowledgeGraph.createRecord(id: string, data: CreateKGRecordRequest): Promise<KGRecord>
```

Creates a new record (node) in a knowledge graph instance.

Records represent entities or concepts in the graph. Each record
has a type, properties, and can be connected to other records
through edges.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the graph instance |
| `data` | `CreateKGRecordRequest` | Yes | Record creation payload including type and properties |

**Returns:** `Promise<KGRecord>` — A promise that resolves to the newly created

[Full reference →](./createRecord)

---

### `createView`

```typescript
client.knowledgeGraph.createView(data: CreateKGViewRequest): Promise<KGView>
```

Creates a new view for querying a knowledge graph.

Views are saved queries that extract specific subsets of graph data.
They can be created from a template or with a custom query definition.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateKGViewRequest` | Yes | View creation payload including query definition and target instance |

**Returns:** `Promise<KGView>` — A promise that resolves to the newly created

[Full reference →](./createView)

---

### `createViewTemplate`

```typescript
client.knowledgeGraph.createViewTemplate(data: CreateKGViewTemplateRequest): Promise<KGViewTemplate>
```

Creates a new view template for knowledge graphs.

View templates define reusable query patterns for extracting
specific subsets of graph data. They act as saved queries that
can be instantiated with different parameters.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateKGViewTemplateRequest` | Yes | View template creation payload including query definition |

**Returns:** `Promise<KGViewTemplate>` — A promise that resolves to the newly created

[Full reference →](./createViewTemplate)

---

### `deleteEdge`

```typescript
client.knowledgeGraph.deleteEdge(id: string, edgeId: string): Promise<unknown>
```

Deletes an edge from a knowledge graph instance.

Removes the relationship between two records. The records
themselves are not affected.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the graph instance |
| `edgeId` | `string` | Yes | The unique identifier of the edge to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when deletion is complete

[Full reference →](./deleteEdge)

---

### `deleteInstance`

```typescript
client.knowledgeGraph.deleteInstance(id: string): Promise<unknown>
```

Deletes a knowledge graph instance and all its data.

Permanently removes the instance including all records, edges, and
associated views. This action cannot be undone.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the instance to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when deletion is complete

[Full reference →](./deleteInstance)

---

### `deleteInstanceTemplate`

```typescript
client.knowledgeGraph.deleteInstanceTemplate(id: string): Promise<unknown>
```

Deletes a knowledge graph instance template.

Removes the template definition. Instances created from this template
continue to exist but can no longer reference the deleted template.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the template to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when deletion is complete

[Full reference →](./deleteInstanceTemplate)

---

### `deleteRecord`

```typescript
client.knowledgeGraph.deleteRecord(id: string, recordId: string): Promise<unknown>
```

Deletes a record from a knowledge graph instance.

Removes the node and any edges connected to it. This may affect
the connectivity of the graph.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the graph instance |
| `recordId` | `string` | Yes | The unique identifier of the record to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when deletion is complete

[Full reference →](./deleteRecord)

---

### `deleteView`

```typescript
client.knowledgeGraph.deleteView(id: string): Promise<unknown>
```

Deletes a view.

Removes the saved query. The underlying graph data is not affected.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the view to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when deletion is complete

[Full reference →](./deleteView)

---

### `deleteViewTemplate`

```typescript
client.knowledgeGraph.deleteViewTemplate(id: string): Promise<unknown>
```

Deletes a view template.

Removes the template definition. Views created from this template
continue to exist independently.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the view template to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when deletion is complete

[Full reference →](./deleteViewTemplate)

---

### `executeView`

```typescript
client.knowledgeGraph.executeView(id: string, params?: Record<string, unknown>): Promise<unknown>
```

Executes a view and returns the query results.

Runs the view's query against its associated graph instance and
returns the matching records and edges. This is the primary way
to extract data from a knowledge graph.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the view to execute |
| `params` | `Record<string, unknown>` | No | Optional runtime parameters to pass to the view query |

**Returns:** `Promise<unknown>` — A promise that resolves to the query results (records and edges)

[Full reference →](./executeView)

---

### `expandNode`

```typescript
client.knowledgeGraph.expandNode(id: string, data: ExpandNodeRequest): Promise<unknown>
```

Expands a node to reveal its immediate connections.

Starting from a specific record, returns all directly connected
records and the edges linking them. Useful for interactive graph
exploration where users progressively reveal the graph structure.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the graph instance |
| `data` | `ExpandNodeRequest` | Yes | Expansion parameters specifying which node to expand and direction |

**Returns:** `Promise<unknown>` — A promise that resolves to the connected records and edges

[Full reference →](./expandNode)

---

### `getInstance`

```typescript
client.knowledgeGraph.getInstance(id: string): Promise<KGInstance>
```

Retrieves a specific knowledge graph instance by its ID.

Returns the full details of a graph instance including its metadata,
template reference, and statistics.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the graph instance |

**Returns:** `Promise<KGInstance>` — A promise that resolves to the

[Full reference →](./getInstance)

---

### `getInstanceTemplate`

```typescript
client.knowledgeGraph.getInstanceTemplate(id: string): Promise<KGInstanceTemplate>
```

Retrieves a specific knowledge graph instance template by its ID.

Returns the full template definition including its schema, node types,
and edge constraints.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the instance template |

**Returns:** `Promise<KGInstanceTemplate>` — A promise that resolves to the

[Full reference →](./getInstanceTemplate)

---

### `getRecord`

```typescript
client.knowledgeGraph.getRecord(id: string, recordId: string): Promise<KGRecord>
```

Retrieves a specific record from a knowledge graph instance.

Returns the full record including all its properties and type
information.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the graph instance |
| `recordId` | `string` | Yes | The unique identifier of the record within the instance |

**Returns:** `Promise<KGRecord>` — A promise that resolves to the

[Full reference →](./getRecord)

---

### `getSubgraph`

```typescript
client.knowledgeGraph.getSubgraph(id: string, params?: KGSubgraphParams): Promise<unknown>
```

Retrieves a subgraph of a knowledge graph instance.

Returns a portion of the graph centered around specified nodes or
matching certain criteria. Useful for visualizing local neighborhoods
without loading the entire graph.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the graph instance |
| `params` | `KGSubgraphParams` | No | Optional parameters controlling subgraph scope (e.g., center node, depth) |

**Returns:** `Promise<unknown>` — A promise that resolves to the subgraph data including records and edges

[Full reference →](./getSubgraph)

---

### `getViewTemplate`

```typescript
client.knowledgeGraph.getViewTemplate(id: string): Promise<KGViewTemplate>
```

Retrieves a specific view template by its ID.

Returns the full template definition including its query pattern
and configurable parameters.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the view template |

**Returns:** `Promise<KGViewTemplate>` — A promise that resolves to the

[Full reference →](./getViewTemplate)

---

### `listEdges`

```typescript
client.knowledgeGraph.listEdges(id: string, params?: Record<string, unknown>): Promise<KGEdge[]>
```

Lists all edges in a knowledge graph instance.

Returns the relationships between records with their types and
endpoint references. Use optional parameters to filter by type.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the graph instance |
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

**Returns:** `Promise<KGEdge[]>` — A promise that resolves to an array of  objects

[Full reference →](./listEdges)

---

### `listInstances`

```typescript
client.knowledgeGraph.listInstances(params?: Record<string, unknown>): Promise<KGInstance[]>
```

Lists all knowledge graph instances.

Returns every graph instance in the system with their metadata
and record/edge counts.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

**Returns:** `Promise<KGInstance[]>` — A promise that resolves to an array of  objects

[Full reference →](./listInstances)

---

### `listInstanceTemplates`

```typescript
client.knowledgeGraph.listInstanceTemplates(params?: Record<string, unknown>): Promise<KGInstanceTemplate[]>
```

Lists all knowledge graph instance templates.

Returns every template in the system with their schema definitions
and metadata.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

**Returns:** `Promise<KGInstanceTemplate[]>` — A promise that resolves to an array of  objects

[Full reference →](./listInstanceTemplates)

---

### `listRecords`

```typescript
client.knowledgeGraph.listRecords(id: string, params?: Record<string, unknown>): Promise<KGRecord[]>
```

Lists all records in a knowledge graph instance.

Returns the nodes in the graph with their types and properties.
Use optional parameters to filter by type or paginate results.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the graph instance |
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

**Returns:** `Promise<KGRecord[]>` — A promise that resolves to an array of  objects

[Full reference →](./listRecords)

---

### `listViews`

```typescript
client.knowledgeGraph.listViews(params?: Record<string, unknown>): Promise<KGView[]>
```

Lists all knowledge graph views.

Returns every view with their query definitions and associated
graph instances.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

**Returns:** `Promise<KGView[]>` — A promise that resolves to an array of  objects

[Full reference →](./listViews)

---

### `listViewTemplates`

```typescript
client.knowledgeGraph.listViewTemplates(params?: Record<string, unknown>): Promise<KGViewTemplate[]>
```

Lists all knowledge graph view templates.

Returns every view template with their query definitions and metadata.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

**Returns:** `Promise<KGViewTemplate[]>` — A promise that resolves to an array of  objects

[Full reference →](./listViewTemplates)

---

### `updateInstanceTemplate`

```typescript
client.knowledgeGraph.updateInstanceTemplate(id: string, data: UpdateKGInstanceTemplateRequest): Promise<KGInstanceTemplate>
```

Updates a knowledge graph instance template.

Modifies the template's schema or metadata. Existing instances
created from this template are not automatically updated.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the template to update |
| `data` | `UpdateKGInstanceTemplateRequest` | Yes | The fields to update |

**Returns:** `Promise<KGInstanceTemplate>` — A promise that resolves to the updated

[Full reference →](./updateInstanceTemplate)

---

### `updateRecord`

```typescript
client.knowledgeGraph.updateRecord(id: string, recordId: string, data: UpdateKGRecordRequest): Promise<KGRecord>
```

Updates a record in a knowledge graph instance.

Modifies the record's properties or type. Only the fields provided
in the request body are updated.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the graph instance |
| `recordId` | `string` | Yes | The unique identifier of the record to update |
| `data` | `UpdateKGRecordRequest` | Yes | The fields to update on the record |

**Returns:** `Promise<KGRecord>` — A promise that resolves to the updated

[Full reference →](./updateRecord)

---

### `updateViewTemplate`

```typescript
client.knowledgeGraph.updateViewTemplate(id: string, data: UpdateKGViewTemplateRequest): Promise<KGViewTemplate>
```

Updates a view template.

Modifies the template's query definition or metadata. Existing
views created from this template are not automatically updated.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the view template to update |
| `data` | `UpdateKGViewTemplateRequest` | Yes | The fields to update |

**Returns:** `Promise<KGViewTemplate>` — A promise that resolves to the updated

[Full reference →](./updateViewTemplate)

