---
title: getRemixAgent
---

# `getRemixAgent`

```typescript
client.agents.getRemixAgent(name: string): Promise<RemixAgent>
```

Retrieves a specific remix agent by name.

Returns the full definition of a remix agent, including its
base agent reference and customizations.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | Yes | The name of the remix agent to retrieve |

## Returns

`Promise<RemixAgent>` — A promise that resolves to the RemixAgent object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agents.getRemixAgent('name');
console.log(result);
```
