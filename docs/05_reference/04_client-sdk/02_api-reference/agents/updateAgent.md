---
title: updateAgent
---

# `updateAgent`

```typescript
client.agents.updateAgent(data: UpdateAgentRequest): Promise<Agent>
```

Updates an installed agent to a newer version.

Applies updates to an already-installed agent, pulling the latest
version from the registry or local source.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UpdateAgentRequest` | Yes | The update configuration |

## Returns

`Promise<Agent>` — A promise that resolves to the updated Agent

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agents.updateAgent(/* UpdateAgentRequest */);
console.log(result);
```
