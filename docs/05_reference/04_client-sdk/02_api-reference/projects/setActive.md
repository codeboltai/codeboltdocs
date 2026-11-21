---
title: setActive
---

# `setActive`

```typescript
client.projects.setActive(data: SetActiveProjectRequest): Promise<void>
```

Sets a project as the currently active project in the workspace.

Switches the active project context, which affects which project's files, configuration,
and history are used for subsequent operations.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `SetActiveProjectRequest` | Yes | The request identifying which project to activate |

## Returns

`Promise<void>` — A promise that resolves when the active project has been switched

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projects.setActive(/* SetActiveProjectRequest */);
console.log(result);
```
