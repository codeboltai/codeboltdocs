---
title: AgentFlow API
---

# AgentFlow API

Agent Flow API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`create`](./create) | Creates a new agent flow. |
| [`get`](./get) | Retrieves agent flow(s). |
| [`getPlugins`](./getPlugins) | Retrieves available agent flow plugins. |
| [`getPluginUi`](./getPluginUi) | Retrieves the UI definition for a specific flow plugin. |
| [`update`](./update) | Updates an existing agent flow. |

## Methods

---

### `create`

```typescript
client.agentFlow.create(data: CreateAgentFlowRequest): Promise<AgentFlow>
```

Creates a new agent flow.

Defines a new node-based workflow that agents can execute. The flow
consists of interconnected plugin nodes that define the processing pipeline.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateAgentFlowRequest` | Yes | The flow creation payload including nodes and connections |

**Returns:** `Promise<AgentFlow>` — A promise that resolves to the newly created AgentFlow

[Full reference →](./create)

---

### `get`

```typescript
client.agentFlow.get(params?: Record<string, unknown>): Promise<AgentFlow>
```

Retrieves agent flow(s).

Returns one or more agent flows based on the provided query parameters.
Use this to look up flows by name, ID, or other criteria.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters to identify which flow(s) to retrieve |

**Returns:** `Promise<AgentFlow>` — A promise that resolves to the AgentFlow object

[Full reference →](./get)

---

### `getPlugins`

```typescript
client.agentFlow.getPlugins(params?: Record<string, unknown>): Promise<AgentFlowPlugin[]>
```

Retrieves available agent flow plugins.

Returns the list of plugin types that can be used as nodes within
agent flows, each defining a specific processing capability.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering plugins |

**Returns:** `Promise<AgentFlowPlugin[]>` — A promise that resolves to an array of AgentFlowPlugin objects

[Full reference →](./getPlugins)

---

### `getPluginUi`

```typescript
client.agentFlow.getPluginUi(pluginName: string): Promise<AgentFlowPluginUi>
```

Retrieves the UI definition for a specific flow plugin.

Returns the schema and layout information needed to render the
plugin's configuration interface in the flow editor.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `pluginName` | `string` | Yes | The name of the plugin to get the UI definition for |

**Returns:** `Promise<AgentFlowPluginUi>` — A promise that resolves to the AgentFlowPluginUi definition

[Full reference →](./getPluginUi)

---

### `update`

```typescript
client.agentFlow.update(data: UpdateAgentFlowRequest): Promise<AgentFlow>
```

Updates an existing agent flow.

Modifies the node configuration, connections, or metadata of an
existing flow.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UpdateAgentFlowRequest` | Yes | The update payload containing the modified flow data |

**Returns:** `Promise<AgentFlow>` — A promise that resolves to the updated AgentFlow

[Full reference →](./update)

