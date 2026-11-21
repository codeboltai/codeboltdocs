---
title: list
---

# `list`

```typescript
client.templates.list(params?: TemplateListParams): Promise<Template[]>
```

Lists templates with optional filtering.

Returns templates matching the provided query parameters. This is
useful for finding templates by type, category, or other criteria
without loading the entire template catalog.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `TemplateListParams` | No | Optional query parameters for filtering templates |

## Returns

`Promise<Template[]>` — A promise that resolves to an array of matching Template objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.templates.list();
console.log(result);
```
