---
title: createPackage
---

# `createPackage`

```typescript
client.projectStructure.createPackage(data: CreatePackageRequest): Promise<PackageDefinition>
```

Creates a new package definition in the project structure.

Adds a logical package to the workspace structure with the given name and configuration.
Packages group related code sections and items together.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreatePackageRequest` | Yes | The package creation payload |

## Returns

`Promise<PackageDefinition>` — A promise that resolves to the newly created package definition

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projectStructure.createPackage(/* CreatePackageRequest */);
console.log(result);
```
