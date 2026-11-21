---
title: create
---

# `create`

```typescript
client.themes.create(data: CreateThemeRequest): Promise<Theme>
```

Creates a new custom theme.

Registers a new theme with the system using the provided configuration.
The theme can be customized with specific colors, fonts, and styling
preferences to match design requirements.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateThemeRequest` | Yes | Request containing the new theme configuration |

## Returns

`Promise<Theme>` — A promise that resolves to the created Theme object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.themes.create(/* CreateThemeRequest */);
console.log(result);
```
