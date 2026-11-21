---
title: updateSummary
---

# `updateSummary`

```typescript
client.agentDeliberation.updateSummary(id: string, data: UpdateDeliberationSummaryRequest): Promise<Deliberation>
```

Updates the summary of a deliberation.

Sets or modifies the summary text that describes the outcome or
current state of the deliberation.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the deliberation |
| `data` | `UpdateDeliberationSummaryRequest` | Yes | The summary update payload |

## Returns

`Promise<Deliberation>` — A promise that resolves to the updated Deliberation

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentDeliberation.updateSummary('id', /* UpdateDeliberationSummaryRequest */);
console.log(result);
```
