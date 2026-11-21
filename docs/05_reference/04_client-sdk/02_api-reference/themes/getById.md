---
title: getById
---

# `getById`

```typescript
client.themes.getById(themeId: string): Promise<Theme>
```

Retrieves a specific theme by its unique identifier.

Returns detailed information about a single theme including its
configuration, colors, settings, and metadata.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `themeId` | `string` | Yes | The unique identifier of the theme to retrieve |

## Returns

`Promise<Theme>` — A promise that resolves to the requested Theme object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.themes.getById('themeId');
console.log(result);
```
