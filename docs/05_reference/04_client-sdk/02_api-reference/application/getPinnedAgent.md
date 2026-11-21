---
title: getPinnedAgent
---

# `getPinnedAgent`

```typescript
client.application.getPinnedAgent(): Promise<PinnedAgent | null>
```

Retrieves the currently pinned agent.

Returns the agent that is currently pinned to the UI, or null if
no agent is pinned.

## Parameters

_No parameters._

## Returns

`Promise<PinnedAgent | null>` — A promise that resolves to the PinnedAgent or null

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.application.getPinnedAgent();
console.log(result);
```
