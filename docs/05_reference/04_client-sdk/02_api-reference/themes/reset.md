---
title: reset
---

# `reset`

```typescript
client.themes.reset(data?: Record<string, unknown>): Promise<unknown>
```

Resets themes to their default configuration.

Restores all theme settings to the original system defaults.
Optionally accepts custom data to control the reset behavior.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `Record<string, unknown>` | No | Optional parameters for controlling the reset operation |

## Returns

`Promise<unknown>` — A promise that resolves when themes have been reset

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.themes.reset();
console.log(result);
```
