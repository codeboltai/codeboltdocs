---
title: get
---

# `get`

```typescript
client.jobs.get(id: string): Promise<Job>
```

Retrieves a specific job by its ID.

Returns the full details of a single job including its status,
dependencies, labels, and pheromones.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the job |

## Returns

`Promise<Job>` — A promise that resolves to the

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.jobs.get('id');
console.log(result);
```
