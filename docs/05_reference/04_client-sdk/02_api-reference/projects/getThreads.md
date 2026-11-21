---
title: getThreads
---

# `getThreads`

```typescript
client.projects.getThreads(): Promise<unknown[]>
```

Retrieves all conversation threads associated with the current project.

Returns the list of active and archived threads, which represent individual
conversation streams within the project.

## Parameters

_No parameters._

## Returns

`Promise<unknown[]>` — A promise that resolves to an array of project threads

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projects.getThreads();
console.log(result);
```
