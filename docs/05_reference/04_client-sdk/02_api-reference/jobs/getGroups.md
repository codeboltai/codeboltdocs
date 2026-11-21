---
title: getGroups
---

# `getGroups`

```typescript
client.jobs.getGroups(): Promise<JobGroup[]>
```

Lists all job groups.

Job groups organize related jobs into logical collections, making
it easier to manage large numbers of jobs.

## Parameters

_No parameters._

## Returns

`Promise<JobGroup[]>` — A promise that resolves to an array of  objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.jobs.getGroups();
console.log(result);
```
