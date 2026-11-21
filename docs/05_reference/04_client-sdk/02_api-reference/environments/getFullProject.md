---
title: getFullProject
---

# `getFullProject`

```typescript
client.environments.getFullProject(id: string): Promise<unknown>
```

Retrieves the complete project file structure from an environment.

Returns the full directory tree and file listing for the project
contained within the environment.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the environment |

## Returns

`Promise<unknown>` — A promise that resolves to the project structure data

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environments.getFullProject('id');
console.log(result);
```
