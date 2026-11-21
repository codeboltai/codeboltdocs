---
title: reviewIdea
---

# `reviewIdea`

```typescript
client.roadmap.reviewIdea(ideaId: string, data?: ReviewIdeaRequest): Promise<unknown>
```

Submits an idea for review.

Moves an idea into the review process where it can be evaluated for potential
promotion to a roadmap feature.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `ideaId` | `string` | Yes | The unique identifier of the idea to review |
| `data` | `ReviewIdeaRequest` | No | Optional review parameters such as reviewer assignment |

## Returns

`Promise<unknown>` — A promise that resolves when the idea has been submitted for review

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.roadmap.reviewIdea('ideaId');
console.log(result);
```
