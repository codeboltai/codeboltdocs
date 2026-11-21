---
title: list
---

# `list`

```typescript
client.workspace.list(): Promise<Workspace[]>
```

Lists all available workspaces for the current user.

Returns every workspace the user has access to, including their
personal workspaces and any shared workspaces. Useful for workspace
browsing and selection UIs.

## Parameters

_No parameters._

## Returns

`Promise<Workspace[]>` — A promise that resolves to an array of Workspace objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.workspace.list();
console.log(result);
```
