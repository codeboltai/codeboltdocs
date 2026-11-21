---
title: setCurrentLayout
---

# `setCurrentLayout`

```typescript
client.application.setCurrentLayout(data: SetCurrentLayoutRequest): Promise<void>
```

Sets the current active layout.

Switches the application to use a specific layout configuration,
rearranging panels and views accordingly.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `SetCurrentLayoutRequest` | Yes | The layout selection |

## Returns

`Promise<void>` — A promise that resolves when the layout has been applied

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.application.setCurrentLayout(/* SetCurrentLayoutRequest */);
console.log(result);
```
