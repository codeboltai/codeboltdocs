---
title: updateRootAppState
---

# `updateRootAppState`

```typescript
client.application.updateRootAppState(data: UpdateRootAppStateRequest): Promise<void>
```

Updates the root application state.

Applies changes to the top-level application state, affecting
global settings across all workspaces.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UpdateRootAppStateRequest` | Yes | The root state update payload |

## Returns

`Promise<void>` — A promise that resolves when the state has been updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.application.updateRootAppState(/* UpdateRootAppStateRequest */);
console.log(result);
```
