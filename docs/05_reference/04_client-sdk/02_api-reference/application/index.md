---
title: Application API
---

# Application API

Application API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`addEnvAndServices`](./addEnvAndServices) | Triggers the addition of environment variables and services. |
| [`getAppState`](./getAppState) | Retrieves the current application state. |
| [`getAppStateLayout`](./getAppStateLayout) | Retrieves the application state layout. |
| [`getCurrentLayout`](./getCurrentLayout) | Retrieves the current active layout. |
| [`getEnvAndServices`](./getEnvAndServices) | Retrieves environment variables and service configurations. |
| [`getPinnedAgent`](./getPinnedAgent) | Retrieves the currently pinned agent. |
| [`getRootAppState`](./getRootAppState) | Retrieves the root application state. |
| [`getThreadToken`](./getThreadToken) | Retrieves the current thread token. |
| [`getTreeView`](./getTreeView) | Retrieves the saved tree view state. |
| [`saveTreeView`](./saveTreeView) | Saves the tree view state. |
| [`setCurrentLayout`](./setCurrentLayout) | Sets the current active layout. |
| [`setModeLayout`](./setModeLayout) | Sets the mode layout configuration. |
| [`setPinnedAgent`](./setPinnedAgent) | Sets the pinned agent for the application. |
| [`stopAllProcess`](./stopAllProcess) | Stops all running processes. |
| [`unpinAgent`](./unpinAgent) | Unpins the currently pinned agent. |
| [`updateAppState`](./updateAppState) | Updates the application state. |
| [`updateRootAppState`](./updateRootAppState) | Updates the root application state. |

## Methods

---

### `addEnvAndServices`

```typescript
client.application.addEnvAndServices(): Promise<void>
```

Triggers the addition of environment variables and services.

Initiates the process of detecting and adding environment variables
and service configurations to the current workspace.

_No parameters._

**Returns:** `Promise<void>` — A promise that resolves when the operation is complete

[Full reference →](./addEnvAndServices)

---

### `getAppState`

```typescript
client.application.getAppState(): Promise<AppState>
```

Retrieves the current application state.

Returns the full application state object containing the active
configuration, user preferences, and runtime status.

_No parameters._

**Returns:** `Promise<AppState>` — A promise that resolves to the current AppState object

[Full reference →](./getAppState)

---

### `getAppStateLayout`

```typescript
client.application.getAppStateLayout(): Promise<AppStateLayout>
```

Retrieves the application state layout.

Returns the full layout configuration for the application, including
all mode-specific layout definitions.

_No parameters._

**Returns:** `Promise<AppStateLayout>` — A promise that resolves to the AppStateLayout object

[Full reference →](./getAppStateLayout)

---

### `getCurrentLayout`

```typescript
client.application.getCurrentLayout(): Promise<CurrentLayout>
```

Retrieves the current active layout.

Returns the layout configuration that is currently being displayed
in the application UI.

_No parameters._

**Returns:** `Promise<CurrentLayout>` — A promise that resolves to the CurrentLayout object

[Full reference →](./getCurrentLayout)

---

### `getEnvAndServices`

```typescript
client.application.getEnvAndServices(): Promise<EnvAndServices>
```

Retrieves environment variables and service configurations.

Returns the environment variables and external service connection
details configured for the current workspace.

_No parameters._

**Returns:** `Promise<EnvAndServices>` — A promise that resolves to the EnvAndServices object

[Full reference →](./getEnvAndServices)

---

### `getPinnedAgent`

```typescript
client.application.getPinnedAgent(): Promise<PinnedAgent | null>
```

Retrieves the currently pinned agent.

Returns the agent that is currently pinned to the UI, or null if
no agent is pinned.

_No parameters._

**Returns:** `Promise<PinnedAgent | null>` — A promise that resolves to the PinnedAgent or null

[Full reference →](./getPinnedAgent)

---

### `getRootAppState`

```typescript
client.application.getRootAppState(): Promise<RootAppState>
```

Retrieves the root application state.

Returns the top-level state object that encompasses all workspace
and global application settings.

_No parameters._

**Returns:** `Promise<RootAppState>` — A promise that resolves to the RootAppState object

[Full reference →](./getRootAppState)

---

### `getThreadToken`

```typescript
client.application.getThreadToken(): Promise<ThreadToken>
```

Retrieves the current thread token.

Returns the authentication token associated with the current thread,
used for securing inter-process communication.

_No parameters._

**Returns:** `Promise<ThreadToken>` — A promise that resolves to the ThreadToken object

[Full reference →](./getThreadToken)

---

### `getTreeView`

```typescript
client.application.getTreeView(): Promise<TreeViewState>
```

Retrieves the saved tree view state.

Returns the previously persisted tree view configuration so the UI
can restore the user's preferred view.

_No parameters._

**Returns:** `Promise<TreeViewState>` — A promise that resolves to the TreeViewState object

[Full reference →](./getTreeView)

---

### `saveTreeView`

```typescript
client.application.saveTreeView(data: SaveTreeViewRequest): Promise<void>
```

Saves the tree view state.

Persists the current state of the file/project tree view, including
expanded nodes, scroll position, and selection.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `SaveTreeViewRequest` | Yes | The tree view state to save |

**Returns:** `Promise<void>` — A promise that resolves when the state has been saved

[Full reference →](./saveTreeView)

---

### `setCurrentLayout`

```typescript
client.application.setCurrentLayout(data: SetCurrentLayoutRequest): Promise<void>
```

Sets the current active layout.

Switches the application to use a specific layout configuration,
rearranging panels and views accordingly.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `SetCurrentLayoutRequest` | Yes | The layout selection |

**Returns:** `Promise<void>` — A promise that resolves when the layout has been applied

[Full reference →](./setCurrentLayout)

---

### `setModeLayout`

```typescript
client.application.setModeLayout(data: SetModeLayoutRequest): Promise<void>
```

Sets the mode layout configuration.

Configures how the application layout behaves in a specific mode
(e.g., coding, debugging, reviewing).

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `SetModeLayoutRequest` | Yes | The mode layout configuration |

**Returns:** `Promise<void>` — A promise that resolves when the layout has been set

[Full reference →](./setModeLayout)

---

### `setPinnedAgent`

```typescript
client.application.setPinnedAgent(data: SetPinnedAgentRequest): Promise<void>
```

Sets the pinned agent for the application.

Pins a specific agent to the UI, making it the default or always-visible
agent for quick access.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `SetPinnedAgentRequest` | Yes | The pinning configuration |

**Returns:** `Promise<void>` — A promise that resolves when the agent has been pinned

[Full reference →](./setPinnedAgent)

---

### `stopAllProcess`

```typescript
client.application.stopAllProcess(data?: StopAllProcessRequest): Promise<void>
```

Stops all running processes.

Terminates every active process in the CodeBolt runtime, including
agents, terminals, and background tasks. Use with caution.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `StopAllProcessRequest` | No | Optional configuration for the stop operation |

**Returns:** `Promise<void>` — A promise that resolves when all processes have been stopped

[Full reference →](./stopAllProcess)

---

### `unpinAgent`

```typescript
client.application.unpinAgent(data?: UnpinAgentRequest): Promise<void>
```

Unpins the currently pinned agent.

Removes the pinned agent from the UI, reverting to the default
agent selection behavior.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UnpinAgentRequest` | No | Optional unpin configuration |

**Returns:** `Promise<void>` — A promise that resolves when the agent has been unpinned

[Full reference →](./unpinAgent)

---

### `updateAppState`

```typescript
client.application.updateAppState(data: UpdateAppStateRequest): Promise<void>
```

Updates the application state.

Applies changes to the application state, persisting the updated
configuration across sessions.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UpdateAppStateRequest` | Yes | The state update payload |

**Returns:** `Promise<void>` — A promise that resolves when the state has been updated

[Full reference →](./updateAppState)

---

### `updateRootAppState`

```typescript
client.application.updateRootAppState(data: UpdateRootAppStateRequest): Promise<void>
```

Updates the root application state.

Applies changes to the top-level application state, affecting
global settings across all workspaces.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UpdateRootAppStateRequest` | Yes | The root state update payload |

**Returns:** `Promise<void>` — A promise that resolves when the state has been updated

[Full reference →](./updateRootAppState)

