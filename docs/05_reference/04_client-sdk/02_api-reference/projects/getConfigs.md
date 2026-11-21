---
title: getConfigs
---

# `getConfigs`

```typescript
client.projects.getConfigs(): Promise<ProjectConfig>
```

Retrieves the configuration settings for the current project.

Returns project-level settings including build commands, environment variables,
agent preferences, and other configurable options.

## Parameters

_No parameters._

## Returns

`Promise<ProjectConfig>` — A promise that resolves to the project configuration

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projects.getConfigs();
console.log(result);
```
