---
title: get
---

# `get`

```typescript
client.agentDeliberation.get(id: string): Promise<Deliberation>
```

Retrieves a specific deliberation by ID.

Returns the full deliberation record including its topic, status,
participants, and summary.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the deliberation |

## Returns

`Promise<Deliberation>` — A promise that resolves to the Deliberation object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentDeliberation.get('id');
console.log(result);
```
