---
title: getLocalAgents
---

# `getLocalAgents`

```typescript
client.agents.getLocalAgents(): Promise<Agent[]>
```

Retrieves agents installed from local sources.

Returns only agents that were installed from the local filesystem,
excluding those from the remote registry.

## Parameters

_No parameters._

## Returns

`Promise<Agent[]>` — A promise that resolves to an array of locally installed Agent objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agents.getLocalAgents();
console.log(result);
```
