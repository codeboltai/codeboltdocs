---
title: getConfig
---

# `getConfig`

```typescript
client.codeboltTools.getConfig(): Promise<CodeboltToolsConfig>
```

Retrieves the current tools configuration.

Returns system-wide settings that control tool behavior, availability,
permissions, and other configuration options. Useful for understanding
the current tool setup.

## Parameters

_No parameters._

## Returns

`Promise<CodeboltToolsConfig>` — A promise that resolves to the CodeboltToolsConfig object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.codeboltTools.getConfig();
console.log(result);
```
