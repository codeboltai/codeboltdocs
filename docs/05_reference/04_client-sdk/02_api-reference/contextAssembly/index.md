---
title: ContextAssembly API
---

# ContextAssembly API

Context Assembly API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`assemble`](./assemble) | Assembles context from multiple sources. |
| [`evaluateRules`](./evaluateRules) | Evaluates context rules against provided data. |
| [`getMemoryTypes`](./getMemoryTypes) | Retrieves available memory types for context assembly. |
| [`getRequiredVariables`](./getRequiredVariables) | Retrieves required variables for a context assembly configuration. |
| [`validate`](./validate) | Validates a context assembly configuration. |

## Methods

---

### `assemble`

```typescript
client.contextAssembly.assemble(data: ContextAssembleRequest): Promise<ContextAssembleResult>
```

Assembles context from multiple sources.

Gathers and merges data from configured context sources (memory types,
rules, files) into a single unified context object for agent consumption.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ContextAssembleRequest` | Yes | The assembly request specifying sources and parameters |

**Returns:** `Promise<ContextAssembleResult>` — A promise that resolves to the assembled

[Full reference →](./assemble)

---

### `evaluateRules`

```typescript
client.contextAssembly.evaluateRules(data: EvaluateContextRulesRequest): Promise<unknown>
```

Evaluates context rules against provided data.

Runs the configured context rules to determine which context
sources should be included based on the current state.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `EvaluateContextRulesRequest` | Yes | The evaluation request with rule inputs |

**Returns:** `Promise<unknown>` — A promise that resolves with the rule evaluation results

[Full reference →](./evaluateRules)

---

### `getMemoryTypes`

```typescript
client.contextAssembly.getMemoryTypes(): Promise<ContextMemoryType[]>
```

Retrieves available memory types for context assembly.

Returns the list of memory type sources that can be used when
assembling context (e.g., episodic, semantic, working memory).

_No parameters._

**Returns:** `Promise<ContextMemoryType[]>` — A promise that resolves to an array of  objects

[Full reference →](./getMemoryTypes)

---

### `getRequiredVariables`

```typescript
client.contextAssembly.getRequiredVariables(data: GetRequiredVariablesRequest): Promise<string[]>
```

Retrieves required variables for a context assembly configuration.

Returns the list of variable names that must be provided when
assembling context with the given configuration.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GetRequiredVariablesRequest` | Yes | The configuration to inspect for required variables |

**Returns:** `Promise<string[]>` — A promise that resolves to an array of variable name strings

[Full reference →](./getRequiredVariables)

---

### `validate`

```typescript
client.contextAssembly.validate(data: ValidateContextAssemblyRequest): Promise<unknown>
```

Validates a context assembly configuration.

Checks that the provided assembly configuration is valid and all
referenced sources and rules exist before execution.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ValidateContextAssemblyRequest` | Yes | The configuration to validate |

**Returns:** `Promise<unknown>` — A promise that resolves with the validation result

[Full reference →](./validate)

