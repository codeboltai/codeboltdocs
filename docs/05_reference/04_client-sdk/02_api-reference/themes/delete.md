---
title: delete
---

# `delete`

```typescript
client.themes.delete(themeId: string): Promise<unknown>
```

Deletes a theme from the system.

Permanently removes the specified theme. If the theme is currently
active, another theme will need to be set as active. This operation
cannot be undone.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `themeId` | `string` | Yes | The unique identifier of the theme to delete |

## Returns

`Promise<unknown>` — A promise that resolves when the theme has been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.themes.delete('themeId');
console.log(result);
```
