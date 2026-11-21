---
title: evaluate
---

# `evaluate`

```typescript
client.contextRuleEngine.evaluate(data: EvaluateAllRulesRequest): Promise<EvaluateRuleResult[]>
```

Evaluates all context rules against provided data.

Runs every rule in the system against the supplied context data and
returns the evaluation results. Useful for batch testing or determining
which rules would trigger in a given scenario.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `EvaluateAllRulesRequest` | Yes | Request containing context data for evaluation |

## Returns

`Promise<EvaluateRuleResult[]>` — A promise that resolves to an array of evaluation results

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.contextRuleEngine.evaluate(/* EvaluateAllRulesRequest */);
console.log(result);
```
