---
title: checkProjectName
---

# `checkProjectName`

```typescript
client.projects.checkProjectName(data: CheckProjectNameRequest): Promise<object>
```

Checks whether a project name is available for use.

Validates that the proposed project name does not conflict with existing projects
in the workspace. Use this before creating a new project.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CheckProjectNameRequest` | Yes | The name check request |

## Returns

`Promise<object>` — A promise that resolves to an object indicating availability

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projects.checkProjectName(/* CheckProjectNameRequest */);
console.log(result);
```
