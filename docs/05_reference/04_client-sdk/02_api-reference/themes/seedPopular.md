---
title: seedPopular
---

# `seedPopular`

```typescript
client.themes.seedPopular(data?: Record<string, unknown>): Promise<unknown>
```

Seeds the system with popular theme presets.

Creates a collection of well-known and widely-used themes based on
popular color schemes and design systems. Useful for initializing
the theme catalog with common options.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `Record<string, unknown>` | No | Optional parameters to control the seeding process |

## Returns

`Promise<unknown>` — A promise that resolves when popular themes have been seeded

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.themes.seedPopular();
console.log(result);
```
