---
title: ContextRuleEngine API
---

# ContextRuleEngine API

Context Rule Engine API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`create`](./create) | Creates a new context rule. |
| [`delete`](./delete) | Deletes a context rule from the system. |
| [`evaluate`](./evaluate) | Evaluates all context rules against provided data. |
| [`evaluateRule`](./evaluateRule) | Evaluates a specific rule against provided data. |
| [`get`](./get) | Retrieves a specific context rule by its unique identifier. |
| [`getVariables`](./getVariables) | Retrieves all available variables for rule evaluation. |
| [`list`](./list) | Lists all available context rules in the system. |
| [`update`](./update) | Updates an existing context rule. |

## Methods

---

### `create`

```typescript
client.contextRuleEngine.create(data: CreateContextRuleRequest): Promise<ContextRuleDefinition>
```

Creates a new context rule.

Registers a new rule with the system using the provided configuration.
The rule can be configured with conditions, priority, and actions to
execute when the rule matches.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateContextRuleRequest` | Yes | Request containing the new rule configuration |

**Returns:** `Promise<ContextRuleDefinition>` — A promise that resolves to the created ContextRuleDefinition object

[Full reference →](./create)

---

### `delete`

```typescript
client.contextRuleEngine.delete(id: string): Promise<unknown>
```

Deletes a context rule from the system.

Permanently removes the specified rule. Any behavior or logic dependent
on this rule will no longer be executed. This operation cannot be undone.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the rule to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when the rule has been deleted

[Full reference →](./delete)

---

### `evaluate`

```typescript
client.contextRuleEngine.evaluate(data: EvaluateAllRulesRequest): Promise<EvaluateRuleResult[]>
```

Evaluates all context rules against provided data.

Runs every rule in the system against the supplied context data and
returns the evaluation results. Useful for batch testing or determining
which rules would trigger in a given scenario.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `EvaluateAllRulesRequest` | Yes | Request containing context data for evaluation |

**Returns:** `Promise<EvaluateRuleResult[]>` — A promise that resolves to an array of evaluation results

[Full reference →](./evaluate)

---

### `evaluateRule`

```typescript
client.contextRuleEngine.evaluateRule(id: string, data: EvaluateRuleRequest): Promise<EvaluateRuleResult>
```

Evaluates a specific rule against provided data.

Runs a single rule evaluation against the supplied context data and
returns whether the rule matched and what actions should be executed.
Useful for testing individual rules or targeted evaluation.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the rule to evaluate |
| `data` | `EvaluateRuleRequest` | Yes | Request containing context data for evaluation |

**Returns:** `Promise<EvaluateRuleResult>` — A promise that resolves to an evaluation result

[Full reference →](./evaluateRule)

---

### `get`

```typescript
client.contextRuleEngine.get(id: string): Promise<ContextRuleDefinition>
```

Retrieves a specific context rule by its unique identifier.

Returns detailed information about a single rule including its
conditions, actions, metadata, and evaluation configuration.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the context rule |

**Returns:** `Promise<ContextRuleDefinition>` — A promise that resolves to the ContextRuleDefinition object

[Full reference →](./get)

---

### `getVariables`

```typescript
client.contextRuleEngine.getVariables(params?: Record<string, unknown>): Promise<ContextRuleVariable[]>
```

Retrieves all available variables for rule evaluation.

Returns the list of context variables that can be referenced in rule
conditions. Each variable includes its type, description, and available
values, helping developers construct valid rule expressions.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering variables |

**Returns:** `Promise<ContextRuleVariable[]>` — A promise that resolves to an array of ContextRuleVariable objects

[Full reference →](./getVariables)

---

### `list`

```typescript
client.contextRuleEngine.list(params?: Record<string, unknown>): Promise<ContextRuleDefinition[]>
```

Lists all available context rules in the system.

Returns every context rule regardless of status or category. Use this
for comprehensive rule browsing or to populate rule management UIs.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering rules |

**Returns:** `Promise<ContextRuleDefinition[]>` — A promise that resolves to an array of ContextRuleDefinition objects

[Full reference →](./list)

---

### `update`

```typescript
client.contextRuleEngine.update(id: string, data: UpdateContextRuleRequest): Promise<ContextRuleDefinition>
```

Updates an existing context rule.

Modifies the properties, conditions, or actions of a rule identified
by its ID. Use this to make incremental changes to a rule without
recreating it from scratch.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the rule to update |
| `data` | `UpdateContextRuleRequest` | Yes | Request containing the rule updates to apply |

**Returns:** `Promise<ContextRuleDefinition>` — A promise that resolves to the updated ContextRuleDefinition object

[Full reference →](./update)

