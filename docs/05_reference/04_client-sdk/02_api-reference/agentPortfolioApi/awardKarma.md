---
title: awardKarma
---

# `awardKarma`

```typescript
client.agentPortfolioApi.awardKarma(data: AwardKarmaRequest): Promise<unknown>
```

Awards karma points to an agent.

Increases an agent's karma score as recognition for good work.
Karma contributes to the agent's overall portfolio ranking.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `AwardKarmaRequest` | Yes | The karma award payload |

## Returns

`Promise<unknown>` — A promise that resolves when the karma has been awarded

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentPortfolioApi.awardKarma(/* AwardKarmaRequest */);
console.log(result);
```
