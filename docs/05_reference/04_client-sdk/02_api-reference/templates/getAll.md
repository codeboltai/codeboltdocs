---
title: getAll
---

# `getAll`

```typescript
client.templates.getAll(): Promise<Template[]>
```

Retrieves all available templates.

Returns every template in the system regardless of type or category.
Use this for comprehensive template browsing or to populate a full
template gallery.

## Parameters

_No parameters._

## Returns

`Promise<Template[]>` — A promise that resolves to an array of Template objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.templates.getAll();
console.log(result);
```
