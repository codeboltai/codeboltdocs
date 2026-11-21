---
title: AgentPortfolioApi API
---

# AgentPortfolioApi API

Agent Portfolio API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`addTalent`](./addTalent) | Adds a talent to an agent's portfolio. |
| [`awardKarma`](./awardKarma) | Awards karma points to an agent. |
| [`createTestimonial`](./createTestimonial) | Creates a new testimonial for an agent. |
| [`deleteTestimonial`](./deleteTestimonial) | Deletes a testimonial. |
| [`endorseTalent`](./endorseTalent) | Endorses a talent on an agent's portfolio. |
| [`getAgentConversations`](./getAgentConversations) | Retrieves conversation history for an agent's portfolio. |
| [`getAgentKarma`](./getAgentKarma) | Retrieves karma details for a specific agent. |
| [`getAgentPortfolio`](./getAgentPortfolio) | Retrieves a specific agent's portfolio. |
| [`getAgentTalents`](./getAgentTalents) | Retrieves all talents for a specific agent. |
| [`getByProject`](./getByProject) | Retrieves agent portfolios filtered by project. |
| [`getRanking`](./getRanking) | Retrieves agent portfolio rankings. |
| [`sendAppreciation`](./sendAppreciation) | Sends an appreciation to an agent. |
| [`updateAgentProfile`](./updateAgentProfile) | Updates an agent's profile information. |
| [`updateTestimonial`](./updateTestimonial) | Updates an existing testimonial. |

## Methods

---

### `addTalent`

```typescript
client.agentPortfolioApi.addTalent(data: AddTalentRequest): Promise<AgentTalent>
```

Adds a talent to an agent's portfolio.

Records a specific skill or capability that the agent possesses,
building out their talent profile.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `AddTalentRequest` | Yes | The talent definition to add |

**Returns:** `Promise<AgentTalent>` — A promise that resolves to the created AgentTalent

[Full reference →](./addTalent)

---

### `awardKarma`

```typescript
client.agentPortfolioApi.awardKarma(data: AwardKarmaRequest): Promise<unknown>
```

Awards karma points to an agent.

Increases an agent's karma score as recognition for good work.
Karma contributes to the agent's overall portfolio ranking.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `AwardKarmaRequest` | Yes | The karma award payload |

**Returns:** `Promise<unknown>` — A promise that resolves when the karma has been awarded

[Full reference →](./awardKarma)

---

### `createTestimonial`

```typescript
client.agentPortfolioApi.createTestimonial(data: CreateTestimonialRequest): Promise<AgentTestimonial>
```

Creates a new testimonial for an agent.

Adds a testimonial or review to an agent's portfolio, recording
feedback about their performance.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateTestimonialRequest` | Yes | The testimonial creation payload |

**Returns:** `Promise<AgentTestimonial>` — A promise that resolves to the created AgentTestimonial

[Full reference →](./createTestimonial)

---

### `deleteTestimonial`

```typescript
client.agentPortfolioApi.deleteTestimonial(id: string): Promise<unknown>
```

Deletes a testimonial.

Permanently removes the specified testimonial from an agent's portfolio.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the testimonial to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when the testimonial has been deleted

[Full reference →](./deleteTestimonial)

---

### `endorseTalent`

```typescript
client.agentPortfolioApi.endorseTalent(data: EndorseTalentRequest): Promise<unknown>
```

Endorses a talent on an agent's portfolio.

Adds an endorsement to a specific talent, increasing its credibility.
Similar to LinkedIn skill endorsements.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `EndorseTalentRequest` | Yes | The endorsement payload |

**Returns:** `Promise<unknown>` — A promise that resolves when the endorsement has been recorded

[Full reference →](./endorseTalent)

---

### `getAgentConversations`

```typescript
client.agentPortfolioApi.getAgentConversations(agentId: string, params?: Record<string, unknown>): Promise<unknown>
```

Retrieves conversation history for an agent's portfolio.

Returns the list of conversations the agent has participated in,
providing context for their portfolio activity.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agentId` | `string` | Yes | The unique identifier of the agent |
| `params` | `Record<string, unknown>` | No | Optional query parameters for pagination |

**Returns:** `Promise<unknown>` — A promise that resolves to the agent's conversation records

[Full reference →](./getAgentConversations)

---

### `getAgentKarma`

```typescript
client.agentPortfolioApi.getAgentKarma(agentId: string, params?: Record<string, unknown>): Promise<AgentKarma>
```

Retrieves karma details for a specific agent.

Returns the agent's karma score breakdown including total karma,
recent awards, and karma history.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agentId` | `string` | Yes | The unique identifier of the agent |
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering karma records |

**Returns:** `Promise<AgentKarma>` — A promise that resolves to the AgentKarma details

[Full reference →](./getAgentKarma)

---

### `getAgentPortfolio`

```typescript
client.agentPortfolioApi.getAgentPortfolio(agentId: string): Promise<AgentPortfolio>
```

Retrieves a specific agent's portfolio.

Returns the full portfolio for a single agent, including their profile,
karma, talents, testimonials, and performance metrics.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agentId` | `string` | Yes | The unique identifier of the agent |

**Returns:** `Promise<AgentPortfolio>` — A promise that resolves to the AgentPortfolio object

[Full reference →](./getAgentPortfolio)

---

### `getAgentTalents`

```typescript
client.agentPortfolioApi.getAgentTalents(agentId: string, params?: Record<string, unknown>): Promise<AgentTalent[]>
```

Retrieves all talents for a specific agent.

Returns the list of skills and capabilities registered in the
agent's portfolio, along with endorsement counts.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agentId` | `string` | Yes | The unique identifier of the agent |
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering |

**Returns:** `Promise<AgentTalent[]>` — A promise that resolves to an array of AgentTalent objects

[Full reference →](./getAgentTalents)

---

### `getByProject`

```typescript
client.agentPortfolioApi.getByProject(params?: AgentByProjectParams): Promise<AgentPortfolio[]>
```

Retrieves agent portfolios filtered by project.

Returns portfolios for agents that have contributed to a specific project,
useful for understanding which agents are active in a project context.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `AgentByProjectParams` | No | Parameters to filter portfolios by project |

**Returns:** `Promise<AgentPortfolio[]>` — A promise that resolves to an array of AgentPortfolio objects

[Full reference →](./getByProject)

---

### `getRanking`

```typescript
client.agentPortfolioApi.getRanking(params?: AgentRankingParams): Promise<AgentPortfolio[]>
```

Retrieves agent portfolio rankings.

Returns agents sorted by their portfolio score, karma, or other
ranking criteria. Useful for discovering top-performing agents.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `AgentRankingParams` | No | Optional ranking parameters for sorting and filtering |

**Returns:** `Promise<AgentPortfolio[]>` — A promise that resolves to an array of ranked AgentPortfolio objects

[Full reference →](./getRanking)

---

### `sendAppreciation`

```typescript
client.agentPortfolioApi.sendAppreciation(data: SendAppreciationRequest): Promise<unknown>
```

Sends an appreciation to an agent.

Records a lightweight positive feedback signal for an agent,
similar to a "like" or "thumbs up" on their work.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `SendAppreciationRequest` | Yes | The appreciation payload |

**Returns:** `Promise<unknown>` — A promise that resolves when the appreciation has been sent

[Full reference →](./sendAppreciation)

---

### `updateAgentProfile`

```typescript
client.agentPortfolioApi.updateAgentProfile(agentId: string, data: UpdateAgentProfileRequest): Promise<AgentPortfolio>
```

Updates an agent's profile information.

Modifies the profile section of an agent's portfolio, such as their
display name, description, or avatar.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agentId` | `string` | Yes | The unique identifier of the agent |
| `data` | `UpdateAgentProfileRequest` | Yes | The profile fields to update |

**Returns:** `Promise<AgentPortfolio>` — A promise that resolves to the updated AgentPortfolio

[Full reference →](./updateAgentProfile)

---

### `updateTestimonial`

```typescript
client.agentPortfolioApi.updateTestimonial(id: string, data: UpdateTestimonialRequest): Promise<AgentTestimonial>
```

Updates an existing testimonial.

Modifies the content or metadata of a previously submitted testimonial.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the testimonial to update |
| `data` | `UpdateTestimonialRequest` | Yes | The fields to update on the testimonial |

**Returns:** `Promise<AgentTestimonial>` — A promise that resolves to the updated AgentTestimonial

[Full reference →](./updateTestimonial)

