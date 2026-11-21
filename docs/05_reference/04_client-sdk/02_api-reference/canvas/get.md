---
title: get
---

# `get`

```typescript
client.canvas.get(params?: GetCanvasParams): Promise<Canvas>
```

Retrieves a canvas document.

Returns the full canvas including its content, metadata, and
current state.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `GetCanvasParams` | No | Optional query parameters to identify the canvas |

## Returns

`Promise<Canvas>` — A promise that resolves to the

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.canvas.get();
console.log(result);
```
