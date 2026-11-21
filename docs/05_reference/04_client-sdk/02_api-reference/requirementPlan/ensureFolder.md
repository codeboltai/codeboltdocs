---
title: ensureFolder
---

# `ensureFolder`

```typescript
client.requirementPlan.ensureFolder(data?: EnsureRequirementPlanFolderRequest): Promise<unknown>
```

Ensures the requirement plan folder exists in the workspace.

Creates the requirement plan directory if it doesn't already exist,
establishing a location for storing plan files and related documents.
This operation is idempotent and safe to call multiple times.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `EnsureRequirementPlanFolderRequest` | No | Optional parameters for folder creation |

## Returns

`Promise<unknown>` — A promise that resolves when the folder is ensured

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.requirementPlan.ensureFolder();
console.log(result);
```
