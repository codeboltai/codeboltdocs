---
title: sendAppreciation
---

# `sendAppreciation`

```typescript
client.agentPortfolioApi.sendAppreciation(data: SendAppreciationRequest): Promise<unknown>
```

Sends an appreciation to an agent.

Records a lightweight positive feedback signal for an agent,
similar to a "like" or "thumbs up" on their work.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `SendAppreciationRequest` | Yes | The appreciation payload |

## Returns

`Promise<unknown>` — A promise that resolves when the appreciation has been sent

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentPortfolioApi.sendAppreciation(/* SendAppreciationRequest */);
console.log(result);
```
