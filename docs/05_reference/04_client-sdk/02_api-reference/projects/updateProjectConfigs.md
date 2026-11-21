---
title: updateProjectConfigs
---

# `updateProjectConfigs`

```typescript
client.projects.updateProjectConfigs(data: UpdateProjectConfigRequest): Promise<void>
```

Updates the project configuration settings.

Applies changes to the project-level configuration. This is the primary way to modify
project settings like build commands, environment variables, and agent defaults.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UpdateProjectConfigRequest` | Yes | The configuration fields to update |

## Returns

`Promise<void>` — A promise that resolves when the configuration has been saved

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projects.updateProjectConfigs(/* UpdateProjectConfigRequest */);
console.log(result);
```
