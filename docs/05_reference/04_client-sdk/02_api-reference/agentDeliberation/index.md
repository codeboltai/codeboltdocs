---
title: AgentDeliberation API
---

# AgentDeliberation API

Agent Deliberation API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`addResponse`](./addResponse) | Adds a response to a deliberation. |
| [`addVote`](./addVote) | Casts a vote on a deliberation. |
| [`create`](./create) | Creates a new deliberation. |
| [`delete`](./delete) | Deletes a deliberation. |
| [`get`](./get) | Retrieves a specific deliberation by ID. |
| [`getAll`](./getAll) | Retrieves all deliberations. |
| [`getResponses`](./getResponses) | Retrieves all responses submitted to a deliberation. |
| [`getVotes`](./getVotes) | Retrieves all votes cast in a deliberation. |
| [`getWinner`](./getWinner) | Retrieves the winning response of a deliberation. |
| [`startAgents`](./startAgents) | Starts agents for a deliberation. |
| [`startVotingAgents`](./startVotingAgents) | Starts voting agents for a deliberation. |
| [`update`](./update) | Partially updates a deliberation. |
| [`updateSummary`](./updateSummary) | Updates the summary of a deliberation. |

## Methods

---

### `addResponse`

```typescript
client.agentDeliberation.addResponse(id: string, data: AddDeliberationResponseRequest): Promise<DeliberationResponse>
```

Adds a response to a deliberation.

Submits a new proposal or answer from an agent as part of the
deliberation process.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the deliberation |
| `data` | `AddDeliberationResponseRequest` | Yes | The response payload containing the agent's proposal |

**Returns:** `Promise<DeliberationResponse>` — A promise that resolves to the created DeliberationResponse

[Full reference →](./addResponse)

---

### `addVote`

```typescript
client.agentDeliberation.addVote(id: string, data: AddDeliberationVoteRequest): Promise<DeliberationVote>
```

Casts a vote on a deliberation.

Records an agent's vote for a specific response within the deliberation.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the deliberation |
| `data` | `AddDeliberationVoteRequest` | Yes | The vote payload |

**Returns:** `Promise<DeliberationVote>` — A promise that resolves to the recorded DeliberationVote

[Full reference →](./addVote)

---

### `create`

```typescript
client.agentDeliberation.create(data: CreateDeliberationRequest): Promise<Deliberation>
```

Creates a new deliberation.

Initiates a deliberation session where multiple agents can propose
solutions and vote on the best approach.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateDeliberationRequest` | Yes | The deliberation creation payload |

**Returns:** `Promise<Deliberation>` — A promise that resolves to the newly created Deliberation

[Full reference →](./create)

---

### `delete`

```typescript
client.agentDeliberation.delete(id: string): Promise<unknown>
```

Deletes a deliberation.

Permanently removes the specified deliberation and all its associated
responses and votes.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the deliberation to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when the deliberation has been deleted

[Full reference →](./delete)

---

### `get`

```typescript
client.agentDeliberation.get(id: string): Promise<Deliberation>
```

Retrieves a specific deliberation by ID.

Returns the full deliberation record including its topic, status,
participants, and summary.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the deliberation |

**Returns:** `Promise<Deliberation>` — A promise that resolves to the Deliberation object

[Full reference →](./get)

---

### `getAll`

```typescript
client.agentDeliberation.getAll(params?: Record<string, unknown>): Promise<Deliberation[]>
```

Retrieves all deliberations.

Returns every deliberation in the system, optionally filtered by
the provided query parameters.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query or filter parameters |

**Returns:** `Promise<Deliberation[]>` — A promise that resolves to an array of Deliberation objects

[Full reference →](./getAll)

---

### `getResponses`

```typescript
client.agentDeliberation.getResponses(id: string): Promise<DeliberationResponse[]>
```

Retrieves all responses submitted to a deliberation.

Returns the proposals or answers that agents have submitted as part
of the deliberation process.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the deliberation |

**Returns:** `Promise<DeliberationResponse[]>` — A promise that resolves to an array of DeliberationResponse objects

[Full reference →](./getResponses)

---

### `getVotes`

```typescript
client.agentDeliberation.getVotes(id: string): Promise<DeliberationVote[]>
```

Retrieves all votes cast in a deliberation.

Returns the voting records showing which agents voted for which
responses.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the deliberation |

**Returns:** `Promise<DeliberationVote[]>` — A promise that resolves to an array of DeliberationVote objects

[Full reference →](./getVotes)

---

### `getWinner`

```typescript
client.agentDeliberation.getWinner(id: string): Promise<DeliberationResponse>
```

Retrieves the winning response of a deliberation.

Returns the response that received the most votes or was otherwise
selected as the winner of the deliberation process.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the deliberation |

**Returns:** `Promise<DeliberationResponse>` — A promise that resolves to the winning DeliberationResponse

[Full reference →](./getWinner)

---

### `startAgents`

```typescript
client.agentDeliberation.startAgents(id: string, data?: StartDeliberationAgentsRequest): Promise<unknown>
```

Starts agents for a deliberation.

Launches the participant agents so they can begin generating responses
for the deliberation topic.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the deliberation |
| `data` | `StartDeliberationAgentsRequest` | No | Optional configuration for the agent startup |

**Returns:** `Promise<unknown>` — A promise that resolves when the agents have been started

[Full reference →](./startAgents)

---

### `startVotingAgents`

```typescript
client.agentDeliberation.startVotingAgents(id: string, data?: StartVotingAgentsRequest): Promise<unknown>
```

Starts voting agents for a deliberation.

Launches the voting agents so they can evaluate the submitted responses
and cast their votes.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the deliberation |
| `data` | `StartVotingAgentsRequest` | No | Optional configuration for the voting agent startup |

**Returns:** `Promise<unknown>` — A promise that resolves when the voting agents have been started

[Full reference →](./startVotingAgents)

---

### `update`

```typescript
client.agentDeliberation.update(id: string, data: UpdateDeliberationRequest): Promise<Deliberation>
```

Partially updates a deliberation.

Applies a patch to the deliberation record, updating only the
fields provided in the request.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the deliberation to update |
| `data` | `UpdateDeliberationRequest` | Yes | The fields to patch on the deliberation |

**Returns:** `Promise<Deliberation>` — A promise that resolves to the updated Deliberation

[Full reference →](./update)

---

### `updateSummary`

```typescript
client.agentDeliberation.updateSummary(id: string, data: UpdateDeliberationSummaryRequest): Promise<Deliberation>
```

Updates the summary of a deliberation.

Sets or modifies the summary text that describes the outcome or
current state of the deliberation.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the deliberation |
| `data` | `UpdateDeliberationSummaryRequest` | Yes | The summary update payload |

**Returns:** `Promise<Deliberation>` — A promise that resolves to the updated Deliberation

[Full reference →](./updateSummary)

