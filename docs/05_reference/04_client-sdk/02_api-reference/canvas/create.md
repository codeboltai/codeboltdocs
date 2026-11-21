---
title: create
---

# `create`

```typescript
client.canvas.create(data: CreateCanvasRequest): Promise<Canvas>
```

Creates a new canvas document.

Provisions a blank or pre-populated canvas that can be used for
visual planning, diagramming, or structured content creation.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateCanvasRequest` | Yes | The canvas creation payload including title and content |

## Returns

`Promise<Canvas>` — A promise that resolves to the newly created

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.canvas.create(/* CreateCanvasRequest */);
console.log(result);
```
