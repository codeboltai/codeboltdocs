---
title: getMetadata
---

# `getMetadata`

```typescript
client.projectStructure.getMetadata(): Promise<WorkspaceMetadata>
```

Retrieves the full workspace metadata including package definitions and structure.

Returns the complete structural representation of the workspace, which describes how
the project is organized into packages, modules, and sections.

## Parameters

_No parameters._

## Returns

`Promise<WorkspaceMetadata>` — A promise that resolves to the workspace metadata

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projectStructure.getMetadata();
console.log(result);
```
