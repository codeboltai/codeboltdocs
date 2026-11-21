---
title: Workspace API
---

# Workspace API

Workspace API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`change`](./change) | Changes the active workspace to the specified one. |
| [`getById`](./getById) | Retrieves a specific workspace by its unique identifier. |
| [`list`](./list) | Lists all available workspaces for the current user. |
| [`listProjects`](./listProjects) | Lists all projects in the current workspace. |
| [`select`](./select) | Selects a workspace as the active context. |

## Methods

---

### `change`

```typescript
client.workspace.change(workspaceId: string): Promise<void>
```

Changes the active workspace to the specified one.

Updates the active workspace context directly without requiring
a separate selection object. This is a simplified version of the
select operation for quick workspace switching.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `workspaceId` | `string` | Yes | The unique identifier of the workspace to activate |

**Returns:** `Promise<void>` — A promise that resolves when the workspace has been changed

[Full reference →](./change)

---

### `getById`

```typescript
client.workspace.getById(workspaceId: string): Promise<Workspace>
```

Retrieves a specific workspace by its unique identifier.

Returns detailed information about a single workspace including
its settings, members, projects, and configuration metadata.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `workspaceId` | `string` | Yes | The unique identifier of the workspace to retrieve |

**Returns:** `Promise<Workspace>` — A promise that resolves to the requested Workspace object

[Full reference →](./getById)

---

### `list`

```typescript
client.workspace.list(): Promise<Workspace[]>
```

Lists all available workspaces for the current user.

Returns every workspace the user has access to, including their
personal workspaces and any shared workspaces. Useful for workspace
browsing and selection UIs.

_No parameters._

**Returns:** `Promise<Workspace[]>` — A promise that resolves to an array of Workspace objects

[Full reference →](./list)

---

### `listProjects`

```typescript
client.workspace.listProjects(): Promise<WorkspaceProject[]>
```

Lists all projects in the current workspace.

Returns an array of workspace projects with their metadata and status.
Use this to display available projects or navigate between them.

_No parameters._

**Returns:** `Promise<WorkspaceProject[]>` — A promise that resolves to an array of WorkspaceProject objects

[Full reference →](./listProjects)

---

### `select`

```typescript
client.workspace.select(data: SelectWorkspaceRequest): Promise<void>
```

Selects a workspace as the active context.

Switches the active workspace to the specified one, updating all
subsequent API calls to operate within that workspace context.
This affects project selection, file access, and other operations.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `SelectWorkspaceRequest` | Yes | Request containing workspace selection details |

**Returns:** `Promise<void>` — A promise that resolves when the workspace has been selected

[Full reference →](./select)

