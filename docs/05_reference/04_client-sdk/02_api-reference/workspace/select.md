---
title: select
---

# `select`

```typescript
client.workspace.select(data: SelectWorkspaceRequest): Promise<void>
```

Selects a workspace as the active context.

Switches the active workspace to the specified one, updating all
subsequent API calls to operate within that workspace context.
This affects project selection, file access, and other operations.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `SelectWorkspaceRequest` | Yes | Request containing workspace selection details |

## Returns

`Promise<void>` — A promise that resolves when the workspace has been selected

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.workspace.select(/* SelectWorkspaceRequest */);
console.log(result);
```
