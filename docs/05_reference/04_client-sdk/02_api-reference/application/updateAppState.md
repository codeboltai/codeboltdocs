---
title: updateAppState
---

# `updateAppState`

```typescript
client.application.updateAppState(data: UpdateAppStateRequest): Promise<void>
```

Updates the application state.

Applies changes to the application state, persisting the updated
configuration across sessions.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UpdateAppStateRequest` | Yes | The state update payload |

## Returns

`Promise<void>` — A promise that resolves when the state has been updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.application.updateAppState(/* UpdateAppStateRequest */);
console.log(result);
```
