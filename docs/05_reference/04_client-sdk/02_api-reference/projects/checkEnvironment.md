---
title: checkEnvironment
---

# `checkEnvironment`

```typescript
client.projects.checkEnvironment(data: CheckEnvironmentRequest): Promise<unknown>
```

Checks the availability and configuration of an environment variable or dependency.

Validates that required environment variables, tools, or runtime dependencies are
properly configured for the project.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CheckEnvironmentRequest` | Yes | The environment check request |

## Returns

`Promise<unknown>` — A promise that resolves to the check result

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projects.checkEnvironment(/* CheckEnvironmentRequest */);
console.log(result);
```
