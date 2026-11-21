---
title: updateRemixAgent
---

# `updateRemixAgent`

```typescript
client.agents.updateRemixAgent(name: string, data: RemixAgent): Promise<RemixAgent>
```

Updates a remix agent.

Modifies the configuration of an existing remix agent.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | Yes | The name of the remix agent to update |
| `data` | `RemixAgent` | Yes | The updated remix agent definition |

## Returns

`Promise<RemixAgent>` — A promise that resolves to the updated RemixAgent

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agents.updateRemixAgent('name', /* RemixAgent */);
console.log(result);
```
