---
title: getByWorkspace
---

# `getByWorkspace`

```typescript
client.projects.getByWorkspace(workspaceId: string): Promise<Project[]>
```

Retrieves all projects belonging to a specific workspace.

Returns the list of projects within the specified workspace, useful for workspace
navigation and project switching.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `workspaceId` | `string` | Yes | The unique identifier of the workspace |

## Returns

`Promise<Project[]>` — A promise that resolves to an array of projects in the workspace

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projects.getByWorkspace('workspaceId');
console.log(result);
```
