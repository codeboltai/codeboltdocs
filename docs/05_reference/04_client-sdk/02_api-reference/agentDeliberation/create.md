---
title: create
---

# `create`

```typescript
client.agentDeliberation.create(data: CreateDeliberationRequest): Promise<Deliberation>
```

Creates a new deliberation.

Initiates a deliberation session where multiple agents can propose
solutions and vote on the best approach.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateDeliberationRequest` | Yes | The deliberation creation payload |

## Returns

`Promise<Deliberation>` — A promise that resolves to the newly created Deliberation

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentDeliberation.create(/* CreateDeliberationRequest */);
console.log(result);
```
