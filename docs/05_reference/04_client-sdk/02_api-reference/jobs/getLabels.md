---
title: getLabels
---

# `getLabels`

```typescript
client.jobs.getLabels(): Promise<JobLabel[]>
```

Lists all available job labels.

Labels are tags that can be attached to jobs for categorization
and filtering purposes.

## Parameters

_No parameters._

## Returns

`Promise<JobLabel[]>` — A promise that resolves to an array of  objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.jobs.getLabels();
console.log(result);
```
