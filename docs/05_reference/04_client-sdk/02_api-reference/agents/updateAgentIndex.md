---
title: updateAgentIndex
---

# `updateAgentIndex`

```typescript
client.agents.updateAgentIndex(): Promise<void>
```

Updates the agent router index.

Forces a rebuild of the internal routing index that maps tasks to
appropriate agents. Call this after installing or removing agents.

## Parameters

_No parameters._

## Returns

`Promise<void>` — A promise that resolves when the index has been updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agents.updateAgentIndex();
console.log(result);
```
