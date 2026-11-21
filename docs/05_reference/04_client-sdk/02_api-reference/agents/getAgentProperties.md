---
title: getAgentProperties
---

# `getAgentProperties`

```typescript
client.agents.getAgentProperties(): Promise<AgentProperties>
```

Retrieves the global agent properties.

Returns system-wide properties that apply to all agents, such as
default timeouts, resource limits, and shared configuration.

## Parameters

_No parameters._

## Returns

`Promise<AgentProperties>` — A promise that resolves to the AgentProperties object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agents.getAgentProperties();
console.log(result);
```
