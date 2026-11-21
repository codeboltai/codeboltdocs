---
title: deleteRemixAgent
---

# `deleteRemixAgent`

```typescript
client.agents.deleteRemixAgent(name: string): Promise<void>
```

Deletes a remix agent.

Permanently removes the specified remix agent from the system.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | Yes | The name of the remix agent to delete |

## Returns

`Promise<void>` — A promise that resolves when the remix agent has been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agents.deleteRemixAgent('name');
console.log(result);
```
