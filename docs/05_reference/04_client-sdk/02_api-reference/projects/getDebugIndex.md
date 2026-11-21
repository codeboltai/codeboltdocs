---
title: getDebugIndex
---

# `getDebugIndex`

```typescript
client.projects.getDebugIndex(): Promise<unknown>
```

Retrieves the debug index for the current project.

Returns the indexed debug information that enables fast lookup of debug sessions,
breakpoint locations, and diagnostic data.

## Parameters

_No parameters._

## Returns

`Promise<unknown>` — A promise that resolves to the debug index data

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projects.getDebugIndex();
console.log(result);
```
