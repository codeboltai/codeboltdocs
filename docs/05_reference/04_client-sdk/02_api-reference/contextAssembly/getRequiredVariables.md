---
title: getRequiredVariables
---

# `getRequiredVariables`

```typescript
client.contextAssembly.getRequiredVariables(data: GetRequiredVariablesRequest): Promise<string[]>
```

Retrieves required variables for a context assembly configuration.

Returns the list of variable names that must be provided when
assembling context with the given configuration.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GetRequiredVariablesRequest` | Yes | The configuration to inspect for required variables |

## Returns

`Promise<string[]>` — A promise that resolves to an array of variable name strings

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.contextAssembly.getRequiredVariables(/* GetRequiredVariablesRequest */);
console.log(result);
```
