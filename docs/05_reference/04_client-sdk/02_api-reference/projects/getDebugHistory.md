---
title: getDebugHistory
---

# `getDebugHistory`

```typescript
client.projects.getDebugHistory(): Promise<unknown[]>
```

Retrieves the debug session history for the current project.

Returns records of past debugging sessions including breakpoints hit, variable
states, and step-through sequences.

## Parameters

_No parameters._

## Returns

`Promise<unknown[]>` — A promise that resolves to an array of debug history entries

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projects.getDebugHistory();
console.log(result);
```
