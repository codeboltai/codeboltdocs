---
title: update
---

# `update`

```typescript
client.specs.update(data: UpdateSpecRequest): Promise<Spec>
```

Updates an existing specification document.

Modifies the content, metadata, or structure of a spec. Use this to
add new sections, update information, change versions, or make other
modifications as specifications evolve.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UpdateSpecRequest` | Yes | Request containing the spec updates |

## Returns

`Promise<Spec>` — A promise that resolves to the updated Spec object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.specs.update(/* UpdateSpecRequest */);
console.log(result);
```
