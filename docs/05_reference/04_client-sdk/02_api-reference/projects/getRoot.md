---
title: getRoot
---

# `getRoot`

```typescript
client.projects.getRoot(): Promise<Project>
```

Retrieves the root project information for the current workspace.

Returns the top-level project metadata including name, path, status, and configuration
references. This is typically the entry point for inspecting the active project.

## Parameters

_No parameters._

## Returns

`Promise<Project>` — A promise that resolves to the root project details

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projects.getRoot();
console.log(result);
```
