---
title: deletePackage
---

# `deletePackage`

```typescript
client.projectStructure.deletePackage(packageId: string): Promise<void>
```

Deletes a package and all its sections and items from the project structure.

Permanently removes the package definition. This does not delete actual source files,
only the structural metadata describing the package.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `packageId` | `string` | Yes | The unique identifier of the package to delete |

## Returns

`Promise<void>` — A promise that resolves when the package has been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projectStructure.deletePackage('packageId');
console.log(result);
```
