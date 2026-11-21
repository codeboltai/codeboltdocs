---
title: getVariables
---

# `getVariables`

```typescript
client.contextRuleEngine.getVariables(params?: Record<string, unknown>): Promise<ContextRuleVariable[]>
```

Retrieves all available variables for rule evaluation.

Returns the list of context variables that can be referenced in rule
conditions. Each variable includes its type, description, and available
values, helping developers construct valid rule expressions.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering variables |

## Returns

`Promise<ContextRuleVariable[]>` — A promise that resolves to an array of ContextRuleVariable objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.contextRuleEngine.getVariables();
console.log(result);
```
