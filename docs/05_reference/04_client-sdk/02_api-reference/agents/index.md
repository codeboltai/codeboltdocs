---
title: Agents API
---

# Agents API

Agents API - agent management

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`changeAgent`](./changeAgent) | Changes the currently active agent. |
| [`createCustomLocalAgent`](./createCustomLocalAgent) | Creates a custom local agent. |
| [`createFlowAgent`](./createFlowAgent) | Creates a flow-based agent. |
| [`createRemoteAgent`](./createRemoteAgent) | Creates a remote agent. |
| [`deleteRemixAgent`](./deleteRemixAgent) | Deletes a remix agent. |
| [`getAgentConfig`](./getAgentConfig) | Retrieves the configuration for a specific agent by name. |
| [`getAgentConfigs`](./getAgentConfigs) | Retrieves all agent configurations. |
| [`getAgentFromLocal`](./getAgentFromLocal) | Retrieves the agent stored in local storage. |
| [`getAgentProperties`](./getAgentProperties) | Retrieves the global agent properties. |
| [`getAllRemixAgents`](./getAllRemixAgents) | Retrieves all remix agents. |
| [`getFeaturedAgents`](./getFeaturedAgents) | Retrieves featured agents from the agent registry. |
| [`getInstalled`](./getInstalled) | Retrieves all installed agents. |
| [`getInstalledAgentsAction`](./getInstalledAgentsAction) | Retrieves action configurations for all installed agents. |
| [`getLocalAgents`](./getLocalAgents) | Retrieves agents installed from local sources. |
| [`getRecommendedAgents`](./getRecommendedAgents) | Retrieves recommended agents based on the current context. |
| [`getRemixAgent`](./getRemixAgent) | Retrieves a specific remix agent by name. |
| [`getRunningAgents`](./getRunningAgents) | Retrieves all currently running agents. |
| [`install`](./install) | Installs an agent from the remote registry. |
| [`installLocal`](./installLocal) | Installs an agent from a local file path. |
| [`saveRemixAgent`](./saveRemixAgent) | Saves a remix agent. |
| [`startAgent`](./startAgent) | Starts a new agent instance with the specified configuration. |
| [`stopAgent`](./stopAgent) | Stops a running agent. |
| [`updateAgent`](./updateAgent) | Updates an installed agent to a newer version. |
| [`updateAgentIndex`](./updateAgentIndex) | Updates the agent router index. |
| [`updateAgentProperties`](./updateAgentProperties) | Updates the global agent properties. |
| [`updateRemixAgent`](./updateRemixAgent) | Updates a remix agent. |

## Methods

---

### `changeAgent`

```typescript
client.agents.changeAgent(data: ChangeAgentRequest): Promise<Agent>
```

Changes the currently active agent.

Switches the runtime to use a different agent, stopping the current
one if necessary. Use this when transitioning between different agent
types during a workflow.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ChangeAgentRequest` | Yes | The agent change configuration |

**Returns:** `Promise<Agent>` — A promise that resolves to the newly active Agent instance

[Full reference →](./changeAgent)

---

### `createCustomLocalAgent`

```typescript
client.agents.createCustomLocalAgent(data: CreateCustomLocalAgentRequest): Promise<Agent>
```

Creates a custom local agent.

Defines a new agent from scratch on the local filesystem with custom
configuration, making it available for use in the runtime.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateCustomLocalAgentRequest` | Yes | The custom agent creation configuration |

**Returns:** `Promise<Agent>` — A promise that resolves to the created Agent

[Full reference →](./createCustomLocalAgent)

---

### `createFlowAgent`

```typescript
client.agents.createFlowAgent(data: CreateFlowAgentRequest): Promise<Agent>
```

Creates a flow-based agent.

Defines a new agent that operates based on a visual flow definition,
where behavior is determined by connected nodes in a flow graph.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateFlowAgentRequest` | Yes | The flow agent creation configuration |

**Returns:** `Promise<Agent>` — A promise that resolves to the created Agent

[Full reference →](./createFlowAgent)

---

### `createRemoteAgent`

```typescript
client.agents.createRemoteAgent(data: CreateRemoteAgentRequest): Promise<Agent>
```

Creates a remote agent.

Registers a new agent that runs on a remote server, allowing
CodeBolt to delegate tasks to external agent services.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateRemoteAgentRequest` | Yes | The remote agent creation configuration |

**Returns:** `Promise<Agent>` — A promise that resolves to the created Agent

[Full reference →](./createRemoteAgent)

---

### `deleteRemixAgent`

```typescript
client.agents.deleteRemixAgent(name: string): Promise<void>
```

Deletes a remix agent.

Permanently removes the specified remix agent from the system.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | Yes | The name of the remix agent to delete |

**Returns:** `Promise<void>` — A promise that resolves when the remix agent has been deleted

[Full reference →](./deleteRemixAgent)

---

### `getAgentConfig`

```typescript
client.agents.getAgentConfig(agentName: string): Promise<AgentConfig>
```

Retrieves the configuration for a specific agent by name.

Returns the full configuration object for the named agent, including
its capabilities, settings, and metadata.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agentName` | `string` | Yes | The name of the agent to look up |

**Returns:** `Promise<AgentConfig>` — A promise that resolves to the AgentConfig for the specified agent

[Full reference →](./getAgentConfig)

---

### `getAgentConfigs`

```typescript
client.agents.getAgentConfigs(): Promise<AgentConfig[]>
```

Retrieves all agent configurations.

Returns configuration objects for every registered agent in the system.

_No parameters._

**Returns:** `Promise<AgentConfig[]>` — A promise that resolves to an array of AgentConfig objects

[Full reference →](./getAgentConfigs)

---

### `getAgentFromLocal`

```typescript
client.agents.getAgentFromLocal(): Promise<Agent>
```

Retrieves the agent stored in local storage.

Returns the agent configuration that has been persisted locally,
typically the last-used or default agent for the current workspace.

_No parameters._

**Returns:** `Promise<Agent>` — A promise that resolves to the locally stored Agent

[Full reference →](./getAgentFromLocal)

---

### `getAgentProperties`

```typescript
client.agents.getAgentProperties(): Promise<AgentProperties>
```

Retrieves the global agent properties.

Returns system-wide properties that apply to all agents, such as
default timeouts, resource limits, and shared configuration.

_No parameters._

**Returns:** `Promise<AgentProperties>` — A promise that resolves to the AgentProperties object

[Full reference →](./getAgentProperties)

---

### `getAllRemixAgents`

```typescript
client.agents.getAllRemixAgents(): Promise<RemixAgent[]>
```

Retrieves all remix agents.

Returns every remix agent that has been created in the system.

_No parameters._

**Returns:** `Promise<RemixAgent[]>` — A promise that resolves to an array of RemixAgent objects

[Full reference →](./getAllRemixAgents)

---

### `getFeaturedAgents`

```typescript
client.agents.getFeaturedAgents(): Promise<Agent[]>
```

Retrieves featured agents from the agent registry.

Returns a curated list of agents that are highlighted or promoted
in the CodeBolt marketplace.

_No parameters._

**Returns:** `Promise<Agent[]>` — A promise that resolves to an array of featured Agent objects

[Full reference →](./getFeaturedAgents)

---

### `getInstalled`

```typescript
client.agents.getInstalled(): Promise<Agent[]>
```

Retrieves all installed agents.

Returns every agent that has been installed in the current CodeBolt
environment, whether from the registry or locally.

_No parameters._

**Returns:** `Promise<Agent[]>` — A promise that resolves to an array of installed Agent objects

[Full reference →](./getInstalled)

---

### `getInstalledAgentsAction`

```typescript
client.agents.getInstalledAgentsAction(): Promise<AgentConfig[]>
```

Retrieves action configurations for all installed agents.

Returns the action capability definitions for each installed agent,
describing what actions they can perform.

_No parameters._

**Returns:** `Promise<AgentConfig[]>` — A promise that resolves to an array of AgentConfig objects

[Full reference →](./getInstalledAgentsAction)

---

### `getLocalAgents`

```typescript
client.agents.getLocalAgents(): Promise<Agent[]>
```

Retrieves agents installed from local sources.

Returns only agents that were installed from the local filesystem,
excluding those from the remote registry.

_No parameters._

**Returns:** `Promise<Agent[]>` — A promise that resolves to an array of locally installed Agent objects

[Full reference →](./getLocalAgents)

---

### `getRecommendedAgents`

```typescript
client.agents.getRecommendedAgents(): Promise<Agent[]>
```

Retrieves recommended agents based on the current context.

Returns agents that are suggested based on the current project type,
user preferences, or usage patterns.

_No parameters._

**Returns:** `Promise<Agent[]>` — A promise that resolves to an array of recommended Agent objects

[Full reference →](./getRecommendedAgents)

---

### `getRemixAgent`

```typescript
client.agents.getRemixAgent(name: string): Promise<RemixAgent>
```

Retrieves a specific remix agent by name.

Returns the full definition of a remix agent, including its
base agent reference and customizations.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | Yes | The name of the remix agent to retrieve |

**Returns:** `Promise<RemixAgent>` — A promise that resolves to the RemixAgent object

[Full reference →](./getRemixAgent)

---

### `getRunningAgents`

```typescript
client.agents.getRunningAgents(): Promise<Agent[]>
```

Retrieves all currently running agents.

Returns a list of agents that are actively executing in the runtime.

_No parameters._

**Returns:** `Promise<Agent[]>` — A promise that resolves to an array of running Agent objects

[Full reference →](./getRunningAgents)

---

### `install`

```typescript
client.agents.install(data: InstallAgentRequest): Promise<Agent>
```

Installs an agent from the remote registry.

Downloads and registers an agent from the CodeBolt agent marketplace,
making it available for local use.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `InstallAgentRequest` | Yes | The installation configuration |

**Returns:** `Promise<Agent>` — A promise that resolves to the installed Agent

[Full reference →](./install)

---

### `installLocal`

```typescript
client.agents.installLocal(data: InstallLocalAgentRequest): Promise<Agent>
```

Installs an agent from a local file path.

Loads and registers an agent from the local filesystem, making it
available for use in the runtime.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `InstallLocalAgentRequest` | Yes | The local installation configuration |

**Returns:** `Promise<Agent>` — A promise that resolves to the installed Agent

[Full reference →](./installLocal)

---

### `saveRemixAgent`

```typescript
client.agents.saveRemixAgent(data: RemixAgent): Promise<RemixAgent>
```

Saves a remix agent.

Creates or saves a remix agent, which is a customized variant of an
existing agent with modified prompts, settings, or capabilities.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `RemixAgent` | Yes | The remix agent definition to save |

**Returns:** `Promise<RemixAgent>` — A promise that resolves to the saved RemixAgent

[Full reference →](./saveRemixAgent)

---

### `startAgent`

```typescript
client.agents.startAgent(data: StartAgentRequest): Promise<Agent>
```

Starts a new agent instance with the specified configuration.

Initializes and launches an agent process in the CodeBolt runtime.
The agent will be configured based on the provided request parameters
including its type, capabilities, and execution context.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `StartAgentRequest` | Yes | The agent start configuration |

**Returns:** `Promise<Agent>` — A promise that resolves to the started Agent instance with its runtime details

[Full reference →](./startAgent)

---

### `stopAgent`

```typescript
client.agents.stopAgent(data: StopAgentRequest): Promise<void>
```

Stops a running agent.

Sends a stop signal to the specified agent, causing it to terminate
gracefully.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `StopAgentRequest` | Yes | The stop request configuration |

**Returns:** `Promise<void>` — A promise that resolves when the agent has been stopped

[Full reference →](./stopAgent)

---

### `updateAgent`

```typescript
client.agents.updateAgent(data: UpdateAgentRequest): Promise<Agent>
```

Updates an installed agent to a newer version.

Applies updates to an already-installed agent, pulling the latest
version from the registry or local source.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UpdateAgentRequest` | Yes | The update configuration |

**Returns:** `Promise<Agent>` — A promise that resolves to the updated Agent

[Full reference →](./updateAgent)

---

### `updateAgentIndex`

```typescript
client.agents.updateAgentIndex(): Promise<void>
```

Updates the agent router index.

Forces a rebuild of the internal routing index that maps tasks to
appropriate agents. Call this after installing or removing agents.

_No parameters._

**Returns:** `Promise<void>` — A promise that resolves when the index has been updated

[Full reference →](./updateAgentIndex)

---

### `updateAgentProperties`

```typescript
client.agents.updateAgentProperties(data: AgentProperties): Promise<AgentProperties>
```

Updates the global agent properties.

Modifies system-wide agent settings that apply to all agent instances.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `AgentProperties` | Yes | The updated agent properties |

**Returns:** `Promise<AgentProperties>` — A promise that resolves to the updated AgentProperties

[Full reference →](./updateAgentProperties)

---

### `updateRemixAgent`

```typescript
client.agents.updateRemixAgent(name: string, data: RemixAgent): Promise<RemixAgent>
```

Updates a remix agent.

Modifies the configuration of an existing remix agent.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | Yes | The name of the remix agent to update |
| `data` | `RemixAgent` | Yes | The updated remix agent definition |

**Returns:** `Promise<RemixAgent>` — A promise that resolves to the updated RemixAgent

[Full reference →](./updateRemixAgent)

