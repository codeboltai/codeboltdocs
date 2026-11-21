---
title: updateAgentProfile
---

# `updateAgentProfile`

```typescript
client.agentPortfolioApi.updateAgentProfile(agentId: string, data: UpdateAgentProfileRequest): Promise<AgentPortfolio>
```

Updates an agent's profile information.

Modifies the profile section of an agent's portfolio, such as their
display name, description, or avatar.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agentId` | `string` | Yes | The unique identifier of the agent |
| `data` | `UpdateAgentProfileRequest` | Yes | The profile fields to update |

## Returns

`Promise<AgentPortfolio>` — A promise that resolves to the updated AgentPortfolio

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentPortfolioApi.updateAgentProfile('agentId', /* UpdateAgentProfileRequest */);
console.log(result);
```
