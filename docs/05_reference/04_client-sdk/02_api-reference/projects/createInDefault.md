---
title: createInDefault
---

# `createInDefault`

```typescript
client.projects.createInDefault(data: Record<string, unknown>): Promise<Project>
```

Creates a new project in the default workspace.

Convenience method that creates a project without needing to specify a workspace.
The project is placed in the system's default workspace directory.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `Record<string, unknown>` | Yes | The project creation payload |

## Returns

`Promise<Project>` — A promise that resolves to the newly created project

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projects.createInDefault(/* Record<string, unknown> */);
console.log(result);
```
