---
title: updateTestimonial
---

# `updateTestimonial`

```typescript
client.agentPortfolioApi.updateTestimonial(id: string, data: UpdateTestimonialRequest): Promise<AgentTestimonial>
```

Updates an existing testimonial.

Modifies the content or metadata of a previously submitted testimonial.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the testimonial to update |
| `data` | `UpdateTestimonialRequest` | Yes | The fields to update on the testimonial |

## Returns

`Promise<AgentTestimonial>` — A promise that resolves to the updated AgentTestimonial

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentPortfolioApi.updateTestimonial('id', /* UpdateTestimonialRequest */);
console.log(result);
```
