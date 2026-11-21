---
title: getPackage
---

# `getPackage`

```typescript
client.projectStructure.getPackage(packageId: string): Promise<PackageDefinition>
```

Retrieves a single package by its unique identifier.

Returns the full package definition including all its sections and items.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `packageId` | `string` | Yes | The unique identifier of the package to retrieve |

## Returns

`Promise<PackageDefinition>` — A promise that resolves to the package definition

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projectStructure.getPackage('packageId');
console.log(result);
```
