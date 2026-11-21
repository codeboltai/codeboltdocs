---
title: createGroup
---

# `createGroup`

```typescript
client.jobs.createGroup(data: CreateJobGroupRequest): Promise<JobGroup>
```

Creates a new job group.

Groups provide an organizational layer for jobs, allowing you to
categorize and manage them as a collection.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateJobGroupRequest` | Yes | Group creation payload including name and description |

## Returns

`Promise<JobGroup>` — A promise that resolves to the newly created

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.jobs.createGroup(/* CreateJobGroupRequest */);
console.log(result);
```
