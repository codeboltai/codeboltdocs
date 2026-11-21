---
title: getAgentFromLocal
---

# `getAgentFromLocal`

```typescript
client.agents.getAgentFromLocal(): Promise<Agent>
```

Retrieves the agent stored in local storage.

Returns the agent configuration that has been persisted locally,
typically the last-used or default agent for the current workspace.

## Parameters

_No parameters._

## Returns

`Promise<Agent>` — A promise that resolves to the locally stored Agent

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agents.getAgentFromLocal();
console.log(result);
```
