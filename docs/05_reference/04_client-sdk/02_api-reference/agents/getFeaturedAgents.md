---
title: getFeaturedAgents
---

# `getFeaturedAgents`

```typescript
client.agents.getFeaturedAgents(): Promise<Agent[]>
```

Retrieves featured agents from the agent registry.

Returns a curated list of agents that are highlighted or promoted
in the CodeBolt marketplace.

## Parameters

_No parameters._

## Returns

`Promise<Agent[]>` — A promise that resolves to an array of featured Agent objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agents.getFeaturedAgents();
console.log(result);
```
