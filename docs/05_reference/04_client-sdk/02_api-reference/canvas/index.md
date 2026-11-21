---
title: Canvas API
---

# Canvas API

Canvas API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`create`](./create) | Creates a new canvas document. |
| [`get`](./get) | Retrieves a canvas document. |
| [`update`](./update) | Updates an existing canvas document. |

## Methods

---

### `create`

```typescript
client.canvas.create(data: CreateCanvasRequest): Promise<Canvas>
```

Creates a new canvas document.

Provisions a blank or pre-populated canvas that can be used for
visual planning, diagramming, or structured content creation.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateCanvasRequest` | Yes | The canvas creation payload including title and content |

**Returns:** `Promise<Canvas>` — A promise that resolves to the newly created

[Full reference →](./create)

---

### `get`

```typescript
client.canvas.get(params?: GetCanvasParams): Promise<Canvas>
```

Retrieves a canvas document.

Returns the full canvas including its content, metadata, and
current state.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `GetCanvasParams` | No | Optional query parameters to identify the canvas |

**Returns:** `Promise<Canvas>` — A promise that resolves to the

[Full reference →](./get)

---

### `update`

```typescript
client.canvas.update(data: UpdateCanvasRequest): Promise<Canvas>
```

Updates an existing canvas document.

Modifies the content, title, or other properties of a canvas.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UpdateCanvasRequest` | Yes | The fields to update on the canvas |

**Returns:** `Promise<Canvas>` — A promise that resolves to the updated

[Full reference →](./update)

