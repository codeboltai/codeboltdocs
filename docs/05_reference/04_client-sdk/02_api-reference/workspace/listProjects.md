---
title: listProjects
---

# `listProjects`

```typescript
client.workspace.listProjects(): Promise<WorkspaceProject[]>
```

Lists all projects in the current workspace.

Returns an array of workspace projects with their metadata and status.
Use this to display available projects or navigate between them.

## Parameters

_No parameters._

## Returns

`Promise<WorkspaceProject[]>` — A promise that resolves to an array of WorkspaceProject objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.workspace.listProjects();
console.log(result);
```
