---
title: update
---

# `update`

```typescript
client.canvas.update(data: UpdateCanvasRequest): Promise<Canvas>
```

Updates an existing canvas document.

Modifies the content, title, or other properties of a canvas.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UpdateCanvasRequest` | Yes | The fields to update on the canvas |

## Returns

`Promise<Canvas>` — A promise that resolves to the updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.canvas.update(/* UpdateCanvasRequest */);
console.log(result);
```
