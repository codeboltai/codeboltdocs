---
title: updateAgentProperties
---

# `updateAgentProperties`

```typescript
client.agents.updateAgentProperties(data: AgentProperties): Promise<AgentProperties>
```

Updates the global agent properties.

Modifies system-wide agent settings that apply to all agent instances.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `AgentProperties` | Yes | The updated agent properties |

## Returns

`Promise<AgentProperties>` — A promise that resolves to the updated AgentProperties

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agents.updateAgentProperties(/* AgentProperties */);
console.log(result);
```
