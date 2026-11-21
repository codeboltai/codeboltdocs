---
title: update
---

# `update`

```typescript
client.contextRuleEngine.update(id: string, data: UpdateContextRuleRequest): Promise<ContextRuleDefinition>
```

Updates an existing context rule.

Modifies the properties, conditions, or actions of a rule identified
by its ID. Use this to make incremental changes to a rule without
recreating it from scratch.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the rule to update |
| `data` | `UpdateContextRuleRequest` | Yes | Request containing the rule updates to apply |

## Returns

`Promise<ContextRuleDefinition>` — A promise that resolves to the updated ContextRuleDefinition object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.contextRuleEngine.update('id', /* UpdateContextRuleRequest */);
console.log(result);
```
