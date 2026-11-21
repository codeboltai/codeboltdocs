---
title: create
---

# `create`

```typescript
client.contextRuleEngine.create(data: CreateContextRuleRequest): Promise<ContextRuleDefinition>
```

Creates a new context rule.

Registers a new rule with the system using the provided configuration.
The rule can be configured with conditions, priority, and actions to
execute when the rule matches.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateContextRuleRequest` | Yes | Request containing the new rule configuration |

## Returns

`Promise<ContextRuleDefinition>` — A promise that resolves to the created ContextRuleDefinition object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.contextRuleEngine.create(/* CreateContextRuleRequest */);
console.log(result);
```
