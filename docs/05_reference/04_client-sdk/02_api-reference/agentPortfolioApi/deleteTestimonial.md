---
title: deleteTestimonial
---

# `deleteTestimonial`

```typescript
client.agentPortfolioApi.deleteTestimonial(id: string): Promise<unknown>
```

Deletes a testimonial.

Permanently removes the specified testimonial from an agent's portfolio.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the testimonial to delete |

## Returns

`Promise<unknown>` — A promise that resolves when the testimonial has been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentPortfolioApi.deleteTestimonial('id');
console.log(result);
```
