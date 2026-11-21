---
title: change
---

# `change`

```typescript
client.workspace.change(workspaceId: string): Promise<void>
```

Changes the active workspace to the specified one.

Updates the active workspace context directly without requiring
a separate selection object. This is a simplified version of the
select operation for quick workspace switching.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `workspaceId` | `string` | Yes | The unique identifier of the workspace to activate |

## Returns

`Promise<void>` — A promise that resolves when the workspace has been changed

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.workspace.change('workspaceId');
console.log(result);
```
