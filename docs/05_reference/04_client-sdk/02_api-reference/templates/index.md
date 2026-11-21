---
title: Templates API
---

# Templates API

Templates API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`getAll`](./getAll) | Retrieves all available templates. |
| [`list`](./list) | Lists templates with optional filtering. |

## Methods

---

### `getAll`

```typescript
client.templates.getAll(): Promise<Template[]>
```

Retrieves all available templates.

Returns every template in the system regardless of type or category.
Use this for comprehensive template browsing or to populate a full
template gallery.

_No parameters._

**Returns:** `Promise<Template[]>` — A promise that resolves to an array of Template objects

[Full reference →](./getAll)

---

### `list`

```typescript
client.templates.list(params?: TemplateListParams): Promise<Template[]>
```

Lists templates with optional filtering.

Returns templates matching the provided query parameters. This is
useful for finding templates by type, category, or other criteria
without loading the entire template catalog.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `TemplateListParams` | No | Optional query parameters for filtering templates |

**Returns:** `Promise<Template[]>` — A promise that resolves to an array of matching Template objects

[Full reference →](./list)

