---
title: create
---

# `create`

```typescript
client.projects.create(data: Record<string, unknown>): Promise<Project>
```

Creates a new project in a specified workspace.

Initializes a new project with the given configuration. The project will be created
in the specified workspace directory with its own configuration and history.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `Record<string, unknown>` | Yes | The project creation payload including name and workspace details |

## Returns

`Promise<Project>` — A promise that resolves to the newly created project

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projects.create(/* Record<string, unknown> */);
console.log(result);
```
