---
title: endorseTalent
---

# `endorseTalent`

```typescript
client.agentPortfolioApi.endorseTalent(data: EndorseTalentRequest): Promise<unknown>
```

Endorses a talent on an agent's portfolio.

Adds an endorsement to a specific talent, increasing its credibility.
Similar to LinkedIn skill endorsements.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `EndorseTalentRequest` | Yes | The endorsement payload |

## Returns

`Promise<unknown>` — A promise that resolves when the endorsement has been recorded

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentPortfolioApi.endorseTalent(/* EndorseTalentRequest */);
console.log(result);
```
