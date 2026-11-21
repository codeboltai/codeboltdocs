---
title: updateCodeboltYaml
---

# `updateCodeboltYaml`

```typescript
client.projects.updateCodeboltYaml(data: UpdateCodeboltYamlRequest): Promise<void>
```

Updates the codebolt.yaml configuration file for the project.

Modifies the project's codebolt.yaml, which defines agent configurations, tool
permissions, and workflow settings specific to the CodeBolt platform.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UpdateCodeboltYamlRequest` | Yes | The YAML configuration updates to apply |

## Returns

`Promise<void>` — A promise that resolves when the YAML has been updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projects.updateCodeboltYaml(/* UpdateCodeboltYamlRequest */);
console.log(result);
```
