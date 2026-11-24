---
sidebar_position: 2.3
title: Knowledge Graph
description: The Knowledge Graph is a graph database layer for storing typed entities (nodes), relationships (edges), and Cypher-like queryable views
---

# Knowledge Graph

The Knowledge Graph is a graph database layer for storing typed entities (nodes), relationships (edges), and Cypher-like queryable views. It is built on **Kuzu DB**, an embedded graph database, and follows a schema-first approach: define templates, create instances, then populate data.

![Knowledge Graph](/productImages/memorycontext/knowledgegraph.png)

## Storage Layout

All data lives under the project directory:

| Path | Purpose |
|------|---------|
| `{projectPath}/.codebolt/knowledgegraph/kuzu/` | Kuzu embedded database files |
| `{projectPath}/.codebolt/knowledgegraph/instance-templates/{id}.json` | Instance template definitions |
| `{projectPath}/.codebolt/knowledgegraph/instances/{id}.json` | Instance metadata |
| `{projectPath}/.codebolt/knowledgegraph/view-templates/{id}.json` | View template definitions |
| `{projectPath}/.codebolt/knowledgegraph/views/{id}.json` | View bindings |

### Kuzu Tables

**Node table**

| Column | Type | Description |
|--------|------|-------------|
| `id` | STRING | Unique node identifier |
| `name` | STRING | Human-readable name |
| `kind` | STRING | Record kind (maps to template definition) |
| `memory_instance_id` | STRING | Owning instance |
| `attributes` | STRING | JSON-encoded attribute map |
| `valid_from` | STRING | Validity start timestamp |
| `valid_to` | STRING | Validity end timestamp |
| `created_at` | STRING | Creation timestamp |

**Edge table**

| Column | Type | Description |
|--------|------|-------------|
| `id` | STRING | Unique edge identifier |
| `kind` | STRING | Relationship type |
| `memory_instance_id` | STRING | Owning instance |
| `created_at` | STRING | Creation timestamp |

:::note Schema Version
The current schema version is **2**. All timestamp columns use `STRING` rather than native Kuzu timestamp types to avoid a known crash in the Kuzu engine.
:::

## Core Concepts

### Instance Template

An instance template is the **schema definition** for a graph. It declares what node types and edge types are allowed.

- **`record_kinds`** -- A map of node type names to their field definitions.
- **`edge_types`** -- A map of relationship names with `from`/`to` constraints that reference `record_kinds`.

Each field in a record kind has:

| Property | Description |
|----------|-------------|
| `type` | A Kuzu field type (see below) |
| `required` | Whether the field must be present |
| `description` | Human-readable explanation |
| `itemType` | Element type when `type` is `LIST` |

**Supported Kuzu field types:** `STRING`, `INT64`, `INT32`, `INT16`, `INT8`, `UINT64`, `UINT32`, `UINT16`, `UINT8`, `DOUBLE`, `FLOAT`, `BOOL`, `DATE`, `TIMESTAMP`, `INTERVAL`, `UUID`, `LIST`, `MAP`, `STRUCT`, `BLOB`.

### Instance

An instance is a **live graph** created from a template.

- Linked to a template by `templateId`.
- Tracks `nodeCount` and `edgeCount` (refreshed from Kuzu on read).
- Instance ID is derived from a sanitized version of its name.

### Memory Record (Node)

A memory record represents a single node in the graph.

| Field | Description |
|-------|-------------|
| `id` | Unique identifier |
| `name` | Display name |
| `kind` | Must match a `record_kinds` entry in the template |
| `attributes` | `Record<string, any>` -- stored as JSON in Kuzu |
| `valid_from` | Optional validity start |
| `valid_to` | Optional validity end |

Attributes are validated against the template schema on every insert and update.

### Edge

An edge represents a directed relationship between two nodes.

| Field | Description |
|-------|-------------|
| `id` | Unique identifier |
| `kind` | Must match an `edge_types` entry in the template |
| `from_node_id` | Source node |
| `to_node_id` | Target node |

The `from` and `to` nodes must match the record kinds declared in the template edge type definition.

### View Template

A view template is a **reusable query definition** written in a Cypher-like DSL.

| Clause | Required | Description |
|--------|----------|-------------|
| `match` | Yes | Starting node pattern |
| `patterns` | No | Edge traversal patterns |
| `where` | No | Filter conditions |
| `with` | No | Computed expressions with aliases |
| `orderBy` | No | Sort specification |
| `skip` | No | Offset |
| `limit` | No | Maximum results |
| `return` | Yes | Field selection with aliases |

- **`applicable_template_ids`** restricts which instance templates a view template can query.

### View

A view is an **active binding** of a view template to a specific instance. Executing a view runs the translated Cypher query against that instance's data.

## Query Translation

The `translateViewToCypher()` function converts the DSL into executable Cypher:

1. **MATCH clause** -- `MATCH (alias:Node {kind: 'recordKind', memory_instance_id: instanceId})`
2. **Pattern clauses** -- Edge traversals respecting direction (`outgoing`, `incoming`, `both`).
3. **WHERE clause** -- Condition translation with supported operators:
   - Comparison: `=`, `!=`, `<>`, `>`, `<`, `>=`, `<=`
   - String: `CONTAINS`, `STARTS WITH`, `ENDS WITH`
   - Collection: `IN`, `NOT IN`
   - Null checks: `IS NULL`, `IS NOT NULL`
4. **WITH clause** -- Computed expressions with aliases.
5. **ORDER BY, SKIP, LIMIT** -- Standard pagination and sorting.
6. **RETURN clause** -- Field selection with optional aliases.

## Schema Validation

Three validation functions enforce data integrity:

- **`validateRecordAgainstSchema()`** -- Checks node attributes against the template's record kind fields. Validates required fields and Kuzu type compatibility.
- **`validateEdgeAgainstSchema()`** -- Confirms that `from` and `to` nodes match the template's edge type definitions.
- **`validateKuzuFieldType()`** -- Performs type validation for all supported Kuzu field types.

## Subgraph and Graph Visualization

Two endpoints support interactive graph exploration:

### `getSubgraph(instanceId, limit, seedNodeId)`

Retrieves a bounded subgraph starting from an optional seed node. Returns:

- `nodes` -- Each node includes `inDegree` and `outDegree` counts.
- `edges` -- Relationships within the subgraph.
- `totalCounts` -- Total nodes and edges in the instance.
- `hasMore` -- Whether additional data exists beyond the limit.

### `expandNode(instanceId, nodeId, direction, limit, excludeNodeIds)`

Expands a single node's neighborhood in a given direction. Returns the same structure as `getSubgraph`.

## Corruption Recovery

Kuzu DB corruption is handled automatically:

1. **`isCorruptionError()`** inspects errors for known Kuzu corruption indicators.
2. **`deleteCorruptedDatabase()`** removes the entire Kuzu directory.
3. **`initializeDatabase()`** detects corruption on startup, deletes the corrupt database, and recreates it from scratch.

## WebSocket Events

The Knowledge Graph emits 20 event types for real-time UI updates:

| Category | Events |
|----------|--------|
| Instance template | `created`, `updated`, `deleted` |
| Instance | `created`, `updated`, `deleted` |
| Memory record | `added`, `records-added`, `updated`, `deleted` |
| Edge | `added`, `edges-added`, `deleted` |
| View template | `created`, `updated`, `deleted` |
| View | `created`, `deleted` |

## REST API

### Instance Templates

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/kg/instance-templates` | Create a template |
| `GET` | `/kg/instance-templates` | List all templates |
| `PUT` | `/kg/instance-templates/:id` | Update a template |
| `DELETE` | `/kg/instance-templates/:id` | Delete a template |

### Instances

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/kg/instances` | Create an instance |
| `GET` | `/kg/instances` | List all instances |
| `DELETE` | `/kg/instances/:id` | Delete an instance |

### Records (Nodes)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/kg/instances/:id/records` | Add a record |
| `GET` | `/kg/instances/:id/records` | List records |
| `GET` | `/kg/instances/:id/records/:recordId` | Get a single record |
| `PUT` | `/kg/instances/:id/records/:recordId` | Update a record |
| `DELETE` | `/kg/instances/:id/records/:recordId` | Delete a record |

### Edges

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/kg/instances/:id/edges` | Add an edge |
| `GET` | `/kg/instances/:id/edges` | List edges |
| `DELETE` | `/kg/instances/:id/edges/:edgeId` | Delete an edge |

### View Templates

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/kg/view-templates` | Create a view template |
| `GET` | `/kg/view-templates` | List view templates |
| `PUT` | `/kg/view-templates/:id` | Update a view template |
| `DELETE` | `/kg/view-templates/:id` | Delete a view template |

### Views

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/kg/views` | Create a view |
| `GET` | `/kg/views` | List views |
| `DELETE` | `/kg/views/:id` | Delete a view |
| `GET` | `/kg/views/:id/execute` | Execute a view query |

### Graph Exploration

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/kg/instances/:id/subgraph` | Retrieve a bounded subgraph |
| `POST` | `/kg/instances/:id/expand-node` | Expand a node's neighborhood |

## SDK Reference

### Create an Instance

```typescript
import codebolt from '@codebolt/codeboltjs';

// Create the template first
const template = await codebolt.knowledgeGraph.createInstanceTemplate({
  name: 'codebase-map',
  record_kinds: {
    Module: {
      fields: {
        path: { type: 'STRING', required: true, description: 'File path' },
        language: { type: 'STRING', required: false, description: 'Programming language' }
      }
    },
    Function: {
      fields: {
        name: { type: 'STRING', required: true, description: 'Function name' },
        lineNumber: { type: 'INT64', required: false, description: 'Start line' }
      }
    }
  },
  edge_types: {
    CONTAINS: { from: 'Module', to: 'Function' },
    CALLS: { from: 'Function', to: 'Function' }
  }
});

// Create an instance from the template
const instance = await codebolt.knowledgeGraph.createInstance({
  name: 'my-project-map',
  templateId: template.id
});
```

### Add Records and Edges

```typescript
// Add nodes
const moduleNode = await codebolt.knowledgeGraph.addMemoryRecord(instance.id, {
  name: 'auth-module',
  kind: 'Module',
  attributes: { path: 'src/auth/index.ts', language: 'typescript' }
});

const funcNode = await codebolt.knowledgeGraph.addMemoryRecord(instance.id, {
  name: 'validateToken',
  kind: 'Function',
  attributes: { name: 'validateToken', lineNumber: 42 }
});

// Add an edge
await codebolt.knowledgeGraph.addEdge(instance.id, {
  kind: 'CONTAINS',
  from_node_id: moduleNode.id,
  to_node_id: funcNode.id
});
```

### Create and Execute a View

```typescript
// Define a reusable query
const viewTemplate = await codebolt.knowledgeGraph.createViewTemplate({
  name: 'all-functions-in-module',
  applicable_template_ids: [template.id],
  match: { alias: 'm', recordKind: 'Module' },
  patterns: [
    { from: 'm', edge: 'CONTAINS', to: { alias: 'f', recordKind: 'Function' }, direction: 'outgoing' }
  ],
  return: [
    { expression: 'm.name', alias: 'module' },
    { expression: 'f.name', alias: 'function' }
  ]
});

// Bind it to an instance
const view = await codebolt.knowledgeGraph.createView({
  viewTemplateId: viewTemplate.id,
  instanceId: instance.id
});

// Execute the query
const results = await codebolt.knowledgeGraph.executeView(view.id);
```

### Delete a Record

```typescript
await codebolt.knowledgeGraph.deleteMemoryRecord(instance.id, recordId);
```
