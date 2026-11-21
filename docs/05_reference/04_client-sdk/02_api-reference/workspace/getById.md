---
title: getById
---

# `getById`

```typescript
client.workspace.getById(workspaceId: string): Promise<Workspace>
```

Retrieves a specific workspace by its unique identifier.

Returns detailed information about a single workspace including
its settings, members, projects, and configuration metadata.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `workspaceId` | `string` | Yes | The unique identifier of the workspace to retrieve |

## Returns

`Promise<Workspace>` — A promise that resolves to the requested Workspace object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.workspace.getById('workspaceId');
console.log(result);
```
