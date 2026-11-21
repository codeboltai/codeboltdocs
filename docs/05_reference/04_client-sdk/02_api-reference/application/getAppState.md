---
title: getAppState
---

# `getAppState`

```typescript
client.application.getAppState(): Promise<AppState>
```

Retrieves the current application state.

Returns the full application state object containing the active
configuration, user preferences, and runtime status.

## Parameters

_No parameters._

## Returns

`Promise<AppState>` — A promise that resolves to the current AppState object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.application.getAppState();
console.log(result);
```
