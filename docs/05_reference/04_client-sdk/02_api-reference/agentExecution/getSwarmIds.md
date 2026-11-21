---
title: getSwarmIds
---

# `getSwarmIds`

```typescript
client.agentExecution.getSwarmIds(): Promise<string[]>
```

Retrieves all known swarm IDs from execution history.

Returns a list of unique swarm identifiers that appear in the execution
records, useful for populating filter dropdowns or discovering swarms.

## Parameters

_No parameters._

## Returns

`Promise<string[]>` — A promise that resolves to an array of swarm ID strings

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentExecution.getSwarmIds();
console.log(result);
```
