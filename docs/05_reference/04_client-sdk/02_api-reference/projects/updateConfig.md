---
title: updateConfig
---

# `updateConfig`

```typescript
client.projects.updateConfig(data: UpdateProjectConfigRequest): Promise<void>
```

Updates the project configuration via an alternative endpoint.

Applies configuration changes to the project settings. Functions similarly to
 but uses a different server route.

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

const result = await client.projects.updateConfig(/* UpdateProjectConfigRequest */);
console.log(result);
```
