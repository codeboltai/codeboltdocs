---
title: getInstalledAgentsAction
---

# `getInstalledAgentsAction`

```typescript
client.agents.getInstalledAgentsAction(): Promise<AgentConfig[]>
```

Retrieves action configurations for all installed agents.

Returns the action capability definitions for each installed agent,
describing what actions they can perform.

## Parameters

_No parameters._

## Returns

`Promise<AgentConfig[]>` — A promise that resolves to an array of AgentConfig objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agents.getInstalledAgentsAction();
console.log(result);
```
