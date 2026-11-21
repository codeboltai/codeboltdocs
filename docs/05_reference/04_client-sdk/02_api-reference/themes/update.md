---
title: update
---

# `update`

```typescript
client.themes.update(themeId: string, data: UpdateThemeRequest): Promise<Theme>
```

Updates an existing theme's configuration.

Modifies the properties, colors, or settings of a theme identified
by its ID. Use this to make incremental changes to a theme without
recreating it from scratch.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `themeId` | `string` | Yes | The unique identifier of the theme to update |
| `data` | `UpdateThemeRequest` | Yes | Request containing the theme updates to apply |

## Returns

`Promise<Theme>` — A promise that resolves to the updated Theme object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.themes.update('themeId', /* UpdateThemeRequest */);
console.log(result);
```
