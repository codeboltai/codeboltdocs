---
title: getPackages
---

# `getPackages`

```typescript
client.projectStructure.getPackages(): Promise<PackageDefinition[]>
```

Retrieves all package definitions in the workspace.

Returns the list of logical packages that make up the project, each containing
its sections, items, and metadata.

## Parameters

_No parameters._

## Returns

`Promise<PackageDefinition[]>` — A promise that resolves to an array of package definitions

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projectStructure.getPackages();
console.log(result);
```
