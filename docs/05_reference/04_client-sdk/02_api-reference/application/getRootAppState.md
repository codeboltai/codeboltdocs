---
title: getRootAppState
---

# `getRootAppState`

```typescript
client.application.getRootAppState(): Promise<RootAppState>
```

Retrieves the root application state.

Returns the top-level state object that encompasses all workspace
and global application settings.

## Parameters

_No parameters._

## Returns

`Promise<RootAppState>` — A promise that resolves to the RootAppState object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.application.getRootAppState();
console.log(result);
```
