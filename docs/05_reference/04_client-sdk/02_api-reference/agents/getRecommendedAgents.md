---
title: getRecommendedAgents
---

# `getRecommendedAgents`

```typescript
client.agents.getRecommendedAgents(): Promise<Agent[]>
```

Retrieves recommended agents based on the current context.

Returns agents that are suggested based on the current project type,
user preferences, or usage patterns.

## Parameters

_No parameters._

## Returns

`Promise<Agent[]>` — A promise that resolves to an array of recommended Agent objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agents.getRecommendedAgents();
console.log(result);
```
