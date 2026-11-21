---
title: createLabel
---

# `createLabel`

```typescript
client.jobs.createLabel(data: CreateLabelRequest): Promise<JobLabel>
```

Creates a new job label.

Registers a label that can be attached to jobs for categorization.
Labels are system-wide and reusable across all jobs.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateLabelRequest` | Yes | Label creation payload including name and optional color |

## Returns

`Promise<JobLabel>` — A promise that resolves to the newly created

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.jobs.createLabel(/* CreateLabelRequest */);
console.log(result);
```
