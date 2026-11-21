---
title: updatePackage
---

# `updatePackage`

```typescript
client.projectStructure.updatePackage(packageId: string, data: UpdatePackageRequest): Promise<PackageDefinition>
```

Updates an existing package definition.

Modifies the metadata and configuration of a package. Does not affect the package's
sections or items; use  and  for those operations.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `packageId` | `string` | Yes | The unique identifier of the package to update |
| `data` | `UpdatePackageRequest` | Yes | The fields to update on the package |

## Returns

`Promise<PackageDefinition>` — A promise that resolves to the updated package definition

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projectStructure.updatePackage('packageId', /* UpdatePackageRequest */);
console.log(result);
```
