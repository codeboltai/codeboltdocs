---
title: getInstalled
---

# `getInstalled`

```typescript
client.agents.getInstalled(): Promise<Agent[]>
```

Retrieves all installed agents.

Returns every agent that has been installed in the current CodeBolt
environment, whether from the registry or locally.

## Parameters

_No parameters._

## Returns

`Promise<Agent[]>` — A promise that resolves to an array of installed Agent objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agents.getInstalled();
console.log(result);
```
