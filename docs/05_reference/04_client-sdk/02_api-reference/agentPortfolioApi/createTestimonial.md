---
title: createTestimonial
---

# `createTestimonial`

```typescript
client.agentPortfolioApi.createTestimonial(data: CreateTestimonialRequest): Promise<AgentTestimonial>
```

Creates a new testimonial for an agent.

Adds a testimonial or review to an agent's portfolio, recording
feedback about their performance.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateTestimonialRequest` | Yes | The testimonial creation payload |

## Returns

`Promise<AgentTestimonial>` — A promise that resolves to the created AgentTestimonial

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentPortfolioApi.createTestimonial(/* CreateTestimonialRequest */);
console.log(result);
```
