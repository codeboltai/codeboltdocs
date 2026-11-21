---
title: resetProject
---

# `resetProject`

```typescript
client.projects.resetProject(data: ResetProjectRequest): Promise<void>
```

Resets a project to its initial state.

Clears the project's chat history, debug sessions, and configuration changes,
restoring it to a clean state. This is a destructive operation that cannot be undone.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ResetProjectRequest` | Yes | The reset request identifying the project and reset scope |

## Returns

`Promise<void>` — A promise that resolves when the project has been reset

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projects.resetProject(/* ResetProjectRequest */);
console.log(result);
```
