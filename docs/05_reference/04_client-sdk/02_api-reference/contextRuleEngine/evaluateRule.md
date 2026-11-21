---
title: evaluateRule
---

# `evaluateRule`

```typescript
client.contextRuleEngine.evaluateRule(id: string, data: EvaluateRuleRequest): Promise<EvaluateRuleResult>
```

Evaluates a specific rule against provided data.

Runs a single rule evaluation against the supplied context data and
returns whether the rule matched and what actions should be executed.
Useful for testing individual rules or targeted evaluation.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the rule to evaluate |
| `data` | `EvaluateRuleRequest` | Yes | Request containing context data for evaluation |

## Returns

`Promise<EvaluateRuleResult>` — A promise that resolves to an evaluation result

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.contextRuleEngine.evaluateRule('id', /* EvaluateRuleRequest */);
console.log(result);
```
