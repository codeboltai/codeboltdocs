---
title: setModeLayout
---

# `setModeLayout`

```typescript
client.application.setModeLayout(data: SetModeLayoutRequest): Promise<void>
```

Sets the mode layout configuration.

Configures how the application layout behaves in a specific mode
(e.g., coding, debugging, reviewing).

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `SetModeLayoutRequest` | Yes | The mode layout configuration |

## Returns

`Promise<void>` — A promise that resolves when the layout has been set

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.application.setModeLayout(/* SetModeLayoutRequest */);
console.log(result);
```
