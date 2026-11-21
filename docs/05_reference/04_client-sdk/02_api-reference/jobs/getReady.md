---
title: getReady
---

# `getReady`

```typescript
client.jobs.getReady(): Promise<Job[]>
```

Retrieves all jobs that are ready to execute.

Returns jobs whose dependencies have all been satisfied, meaning
they can be picked up by agents immediately.

## Parameters

_No parameters._

## Returns

`Promise<Job[]>` — A promise that resolves to an array of ready  objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.jobs.getReady();
console.log(result);
```
