---
title: create
---

# `create`

```typescript
client.jobs.create(data: CreateJobRequest): Promise<Job>
```

Creates a new job.

Registers a work item that can be assigned to agents, tracked through
its lifecycle, and coordinated with other jobs via dependencies.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateJobRequest` | Yes | Job creation payload including title, description, and configuration |

## Returns

`Promise<Job>` — A promise that resolves to the newly created

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.jobs.create(/* CreateJobRequest */);
console.log(result);
```
