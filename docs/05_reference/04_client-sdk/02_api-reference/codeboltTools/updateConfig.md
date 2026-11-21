---
title: updateConfig
---

# `updateConfig`

```typescript
client.codeboltTools.updateConfig(data: UpdateCodeboltToolsConfigRequest): Promise<CodeboltToolsConfig>
```

Updates the tools configuration.

Modifies system-wide tool settings including enabled/disabled tools,
permissions, rate limits, and other configuration options. Changes
take effect immediately.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UpdateCodeboltToolsConfigRequest` | Yes | Request containing configuration updates |

## Returns

`Promise<CodeboltToolsConfig>` — A promise that resolves to the updated CodeboltToolsConfig object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.codeboltTools.updateConfig(/* UpdateCodeboltToolsConfigRequest */);
console.log(result);
```
