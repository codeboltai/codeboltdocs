---
title: getAllRemixAgents
---

# `getAllRemixAgents`

```typescript
client.agents.getAllRemixAgents(): Promise<RemixAgent[]>
```

Retrieves all remix agents.

Returns every remix agent that has been created in the system.

## Parameters

_No parameters._

## Returns

`Promise<RemixAgent[]>` — A promise that resolves to an array of RemixAgent objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agents.getAllRemixAgents();
console.log(result);
```
