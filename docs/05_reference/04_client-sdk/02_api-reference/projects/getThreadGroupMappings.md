---
title: getThreadGroupMappings
---

# `getThreadGroupMappings`

```typescript
client.projects.getThreadGroupMappings(): Promise<ThreadGroupMapping[]>
```

Retrieves all thread-to-group assignment mappings.

Returns the complete mapping of which threads are assigned to which task groups,
useful for building navigation or overview UIs.

## Parameters

_No parameters._

## Returns

`Promise<ThreadGroupMapping[]>` — A promise that resolves to an array of thread-group mapping entries

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projects.getThreadGroupMappings();
console.log(result);
```
