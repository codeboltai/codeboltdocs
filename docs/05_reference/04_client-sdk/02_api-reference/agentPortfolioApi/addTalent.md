---
title: addTalent
---

# `addTalent`

```typescript
client.agentPortfolioApi.addTalent(data: AddTalentRequest): Promise<AgentTalent>
```

Adds a talent to an agent's portfolio.

Records a specific skill or capability that the agent possesses,
building out their talent profile.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `AddTalentRequest` | Yes | The talent definition to add |

## Returns

`Promise<AgentTalent>` — A promise that resolves to the created AgentTalent

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentPortfolioApi.addTalent(/* AddTalentRequest */);
console.log(result);
```
