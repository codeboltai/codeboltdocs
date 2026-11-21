---
title: Projects API
---

# Projects API

Projects API - project management

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`assignThreadToGroup`](./assignThreadToGroup) | Assigns a conversation thread to a task group. |
| [`checkEnvironment`](./checkEnvironment) | Checks the availability and configuration of an environment variable or dependency. |
| [`checkProjectName`](./checkProjectName) | Checks whether a project name is available for use. |
| [`create`](./create) | Creates a new project in a specified workspace. |
| [`createInDefault`](./createInDefault) | Creates a new project in the default workspace. |
| [`createTaskGroup`](./createTaskGroup) | Creates a new task group for organizing conversation threads. |
| [`deleteTaskGroup`](./deleteTaskGroup) | Permanently deletes a task group. |
| [`getAllWithUniqueId`](./getAllWithUniqueId) | Retrieves all projects with their unique identifiers. |
| [`getByWorkspace`](./getByWorkspace) | Retrieves all projects belonging to a specific workspace. |
| [`getChatHistory`](./getChatHistory) | Retrieves the chat history for the current project. |
| [`getConfigs`](./getConfigs) | Retrieves the configuration settings for the current project. |
| [`getDebugHistory`](./getDebugHistory) | Retrieves the debug session history for the current project. |
| [`getDebugIndex`](./getDebugIndex) | Retrieves the debug index for the current project. |
| [`getRoot`](./getRoot) | Retrieves the root project information for the current workspace. |
| [`getTaskGroups`](./getTaskGroups) | Retrieves all task groups defined for the current project. |
| [`getThreadGroup`](./getThreadGroup) | Retrieves the task group that a specific thread is assigned to. |
| [`getThreadGroupMappings`](./getThreadGroupMappings) | Retrieves all thread-to-group assignment mappings. |
| [`getThreads`](./getThreads) | Retrieves all conversation threads associated with the current project. |
| [`getThreadsForGroup`](./getThreadsForGroup) | Retrieves all thread identifiers assigned to a specific task group. |
| [`getTreeBatch`](./getTreeBatch) | Retrieves multiple tree items in a single batch request. |
| [`getTreeChildren`](./getTreeChildren) | Retrieves the child items of a specific node in the project file tree. |
| [`getTreeItem`](./getTreeItem) | Retrieves a specific item from the project's file tree by its identifier. |
| [`resetProject`](./resetProject) | Resets a project to its initial state. |
| [`runCommand`](./runCommand) | Executes a shell command within the project's working directory. |
| [`setActive`](./setActive) | Sets a project as the currently active project in the workspace. |
| [`updateCodeboltYaml`](./updateCodeboltYaml) | Updates the codebolt.yaml configuration file for the project. |
| [`updateConfig`](./updateConfig) | Updates the project configuration via an alternative endpoint. |
| [`updateProjectConfigs`](./updateProjectConfigs) | Updates the project configuration settings. |
| [`updateTaskGroup`](./updateTaskGroup) | Updates an existing task group's properties. |

## Methods

---

### `assignThreadToGroup`

```typescript
client.projects.assignThreadToGroup(data: AssignThreadToGroupRequest): Promise<void>
```

Assigns a conversation thread to a task group.

Links a thread to a task group for organizational purposes. A thread can belong
to at most one group at a time.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `AssignThreadToGroupRequest` | Yes | The assignment request |

**Returns:** `Promise<void>` — A promise that resolves when the assignment has been saved

[Full reference →](./assignThreadToGroup)

---

### `checkEnvironment`

```typescript
client.projects.checkEnvironment(data: CheckEnvironmentRequest): Promise<unknown>
```

Checks the availability and configuration of an environment variable or dependency.

Validates that required environment variables, tools, or runtime dependencies are
properly configured for the project.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CheckEnvironmentRequest` | Yes | The environment check request |

**Returns:** `Promise<unknown>` — A promise that resolves to the check result

[Full reference →](./checkEnvironment)

---

### `checkProjectName`

```typescript
client.projects.checkProjectName(data: CheckProjectNameRequest): Promise<object>
```

Checks whether a project name is available for use.

Validates that the proposed project name does not conflict with existing projects
in the workspace. Use this before creating a new project.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CheckProjectNameRequest` | Yes | The name check request |

**Returns:** `Promise<object>` — A promise that resolves to an object indicating availability

[Full reference →](./checkProjectName)

---

### `create`

```typescript
client.projects.create(data: Record<string, unknown>): Promise<Project>
```

Creates a new project in a specified workspace.

Initializes a new project with the given configuration. The project will be created
in the specified workspace directory with its own configuration and history.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `Record<string, unknown>` | Yes | The project creation payload including name and workspace details |

**Returns:** `Promise<Project>` — A promise that resolves to the newly created project

[Full reference →](./create)

---

### `createInDefault`

```typescript
client.projects.createInDefault(data: Record<string, unknown>): Promise<Project>
```

Creates a new project in the default workspace.

Convenience method that creates a project without needing to specify a workspace.
The project is placed in the system's default workspace directory.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `Record<string, unknown>` | Yes | The project creation payload |

**Returns:** `Promise<Project>` — A promise that resolves to the newly created project

[Full reference →](./createInDefault)

---

### `createTaskGroup`

```typescript
client.projects.createTaskGroup(data: CreateTaskGroupRequest): Promise<TaskGroup>
```

Creates a new task group for organizing conversation threads.

Defines a new group that threads can be assigned to for organizational purposes.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateTaskGroupRequest` | Yes | The task group creation payload |

**Returns:** `Promise<TaskGroup>` — A promise that resolves to the newly created task group

[Full reference →](./createTaskGroup)

---

### `deleteTaskGroup`

```typescript
client.projects.deleteTaskGroup(groupId: string): Promise<void>
```

Permanently deletes a task group.

Removes the task group. Threads previously assigned to this group will become
unassigned but are not deleted.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `groupId` | `string` | Yes | The unique identifier of the task group to delete |

**Returns:** `Promise<void>` — A promise that resolves when the task group has been deleted

[Full reference →](./deleteTaskGroup)

---

### `getAllWithUniqueId`

```typescript
client.projects.getAllWithUniqueId(data: GetAllProjectsRequest): Promise<Project[]>
```

Retrieves all projects with their unique identifiers.

Returns the complete list of projects matching the request criteria, each with a
guaranteed unique ID for cross-referencing.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GetAllProjectsRequest` | Yes | The request specifying which projects to retrieve |

**Returns:** `Promise<Project[]>` — A promise that resolves to an array of projects with unique IDs

[Full reference →](./getAllWithUniqueId)

---

### `getByWorkspace`

```typescript
client.projects.getByWorkspace(workspaceId: string): Promise<Project[]>
```

Retrieves all projects belonging to a specific workspace.

Returns the list of projects within the specified workspace, useful for workspace
navigation and project switching.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `workspaceId` | `string` | Yes | The unique identifier of the workspace |

**Returns:** `Promise<Project[]>` — A promise that resolves to an array of projects in the workspace

[Full reference →](./getByWorkspace)

---

### `getChatHistory`

```typescript
client.projects.getChatHistory(): Promise<unknown[]>
```

Retrieves the chat history for the current project.

Returns an array of past chat sessions and their messages, providing a record of
all conversations that have occurred within the project context.

_No parameters._

**Returns:** `Promise<unknown[]>` — A promise that resolves to an array of chat history entries

[Full reference →](./getChatHistory)

---

### `getConfigs`

```typescript
client.projects.getConfigs(): Promise<ProjectConfig>
```

Retrieves the configuration settings for the current project.

Returns project-level settings including build commands, environment variables,
agent preferences, and other configurable options.

_No parameters._

**Returns:** `Promise<ProjectConfig>` — A promise that resolves to the project configuration

[Full reference →](./getConfigs)

---

### `getDebugHistory`

```typescript
client.projects.getDebugHistory(): Promise<unknown[]>
```

Retrieves the debug session history for the current project.

Returns records of past debugging sessions including breakpoints hit, variable
states, and step-through sequences.

_No parameters._

**Returns:** `Promise<unknown[]>` — A promise that resolves to an array of debug history entries

[Full reference →](./getDebugHistory)

---

### `getDebugIndex`

```typescript
client.projects.getDebugIndex(): Promise<unknown>
```

Retrieves the debug index for the current project.

Returns the indexed debug information that enables fast lookup of debug sessions,
breakpoint locations, and diagnostic data.

_No parameters._

**Returns:** `Promise<unknown>` — A promise that resolves to the debug index data

[Full reference →](./getDebugIndex)

---

### `getRoot`

```typescript
client.projects.getRoot(): Promise<Project>
```

Retrieves the root project information for the current workspace.

Returns the top-level project metadata including name, path, status, and configuration
references. This is typically the entry point for inspecting the active project.

_No parameters._

**Returns:** `Promise<Project>` — A promise that resolves to the root project details

[Full reference →](./getRoot)

---

### `getTaskGroups`

```typescript
client.projects.getTaskGroups(): Promise<TaskGroup[]>
```

Retrieves all task groups defined for the current project.

Task groups organize conversation threads into logical categories for better
workflow management and navigation.

_No parameters._

**Returns:** `Promise<TaskGroup[]>` — A promise that resolves to an array of task groups

[Full reference →](./getTaskGroups)

---

### `getThreadGroup`

```typescript
client.projects.getThreadGroup(threadId: string): Promise<TaskGroup | null>
```

Retrieves the task group that a specific thread is assigned to.

Returns the group assignment for a thread, or null if the thread is not assigned
to any group.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The identifier of the thread to look up |

**Returns:** `Promise<TaskGroup | null>` — A promise that resolves to the assigned task group, or null if unassigned

[Full reference →](./getThreadGroup)

---

### `getThreadGroupMappings`

```typescript
client.projects.getThreadGroupMappings(): Promise<ThreadGroupMapping[]>
```

Retrieves all thread-to-group assignment mappings.

Returns the complete mapping of which threads are assigned to which task groups,
useful for building navigation or overview UIs.

_No parameters._

**Returns:** `Promise<ThreadGroupMapping[]>` — A promise that resolves to an array of thread-group mapping entries

[Full reference →](./getThreadGroupMappings)

---

### `getThreads`

```typescript
client.projects.getThreads(): Promise<unknown[]>
```

Retrieves all conversation threads associated with the current project.

Returns the list of active and archived threads, which represent individual
conversation streams within the project.

_No parameters._

**Returns:** `Promise<unknown[]>` — A promise that resolves to an array of project threads

[Full reference →](./getThreads)

---

### `getThreadsForGroup`

```typescript
client.projects.getThreadsForGroup(groupId: string): Promise<string[]>
```

Retrieves all thread identifiers assigned to a specific task group.

Returns the list of thread IDs that belong to the specified group.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `groupId` | `string` | Yes | The unique identifier of the task group |

**Returns:** `Promise<string[]>` — A promise that resolves to an array of thread identifier strings

[Full reference →](./getThreadsForGroup)

---

### `getTreeBatch`

```typescript
client.projects.getTreeBatch(data: BatchTreeItemsRequest): Promise<TreeItem[]>
```

Retrieves multiple tree items in a single batch request.

Fetches details for several tree items at once, reducing round trips compared to
individual  calls. Useful when loading multiple files or directories.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `BatchTreeItemsRequest` | Yes | The batch request containing the item IDs to fetch |

**Returns:** `Promise<TreeItem[]>` — A promise that resolves to an array of tree items

[Full reference →](./getTreeBatch)

---

### `getTreeChildren`

```typescript
client.projects.getTreeChildren(parentId: string): Promise<TreeItem[]>
```

Retrieves the child items of a specific node in the project file tree.

Returns the immediate children (files and subdirectories) of the specified parent
directory in the project tree. Use this for lazy-loading tree navigation.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `parentId` | `string` | Yes | The unique identifier of the parent tree node |

**Returns:** `Promise<TreeItem[]>` — A promise that resolves to an array of child tree items

[Full reference →](./getTreeChildren)

---

### `getTreeItem`

```typescript
client.projects.getTreeItem(itemId: string): Promise<TreeItem>
```

Retrieves a specific item from the project's file tree by its identifier.

Returns metadata about a file or directory in the project tree, including its name,
path, type, and any associated metadata.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `itemId` | `string` | Yes | The unique identifier of the tree item to retrieve |

**Returns:** `Promise<TreeItem>` — A promise that resolves to the tree item details

[Full reference →](./getTreeItem)

---

### `resetProject`

```typescript
client.projects.resetProject(data: ResetProjectRequest): Promise<void>
```

Resets a project to its initial state.

Clears the project's chat history, debug sessions, and configuration changes,
restoring it to a clean state. This is a destructive operation that cannot be undone.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ResetProjectRequest` | Yes | The reset request identifying the project and reset scope |

**Returns:** `Promise<void>` — A promise that resolves when the project has been reset

[Full reference →](./resetProject)

---

### `runCommand`

```typescript
client.projects.runCommand(data: RunCommandRequest): Promise<unknown>
```

Executes a shell command within the project's working directory.

Runs a command (e.g., build, test, lint) in the context of the project, with access
to the project's environment variables and path configuration.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `RunCommandRequest` | Yes | The command execution request |

**Returns:** `Promise<unknown>` — A promise that resolves to the command execution result

[Full reference →](./runCommand)

---

### `setActive`

```typescript
client.projects.setActive(data: SetActiveProjectRequest): Promise<void>
```

Sets a project as the currently active project in the workspace.

Switches the active project context, which affects which project's files, configuration,
and history are used for subsequent operations.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `SetActiveProjectRequest` | Yes | The request identifying which project to activate |

**Returns:** `Promise<void>` — A promise that resolves when the active project has been switched

[Full reference →](./setActive)

---

### `updateCodeboltYaml`

```typescript
client.projects.updateCodeboltYaml(data: UpdateCodeboltYamlRequest): Promise<void>
```

Updates the codebolt.yaml configuration file for the project.

Modifies the project's codebolt.yaml, which defines agent configurations, tool
permissions, and workflow settings specific to the CodeBolt platform.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UpdateCodeboltYamlRequest` | Yes | The YAML configuration updates to apply |

**Returns:** `Promise<void>` — A promise that resolves when the YAML has been updated

[Full reference →](./updateCodeboltYaml)

---

### `updateConfig`

```typescript
client.projects.updateConfig(data: UpdateProjectConfigRequest): Promise<void>
```

Updates the project configuration via an alternative endpoint.

Applies configuration changes to the project settings. Functions similarly to
 but uses a different server route.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UpdateProjectConfigRequest` | Yes | The configuration fields to update |

**Returns:** `Promise<void>` — A promise that resolves when the configuration has been saved

[Full reference →](./updateConfig)

---

### `updateProjectConfigs`

```typescript
client.projects.updateProjectConfigs(data: UpdateProjectConfigRequest): Promise<void>
```

Updates the project configuration settings.

Applies changes to the project-level configuration. This is the primary way to modify
project settings like build commands, environment variables, and agent defaults.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UpdateProjectConfigRequest` | Yes | The configuration fields to update |

**Returns:** `Promise<void>` — A promise that resolves when the configuration has been saved

[Full reference →](./updateProjectConfigs)

---

### `updateTaskGroup`

```typescript
client.projects.updateTaskGroup(groupId: string, data: UpdateTaskGroupRequest): Promise<TaskGroup>
```

Updates an existing task group's properties.

Modifies the task group's name, description, or other metadata.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `groupId` | `string` | Yes | The unique identifier of the task group to update |
| `data` | `UpdateTaskGroupRequest` | Yes | The fields to update on the task group |

**Returns:** `Promise<TaskGroup>` — A promise that resolves to the updated task group

[Full reference →](./updateTaskGroup)

