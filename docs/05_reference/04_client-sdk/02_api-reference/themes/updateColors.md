---
title: updateColors
---

# `updateColors`

```typescript
client.themes.updateColors(data: UpdateThemeColorsRequest): Promise<unknown>
```

Updates the color scheme of a theme.

Modifies the color palette for one or more themes. This includes
primary colors, background colors, text colors, and other color
variables used throughout the interface.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UpdateThemeColorsRequest` | Yes | Request containing theme color update information |

## Returns

`Promise<unknown>` — A promise that resolves when colors have been updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.themes.updateColors(/* UpdateThemeColorsRequest */);
console.log(result);
```
