---
title: evaluateRules
---

# `evaluateRules`

```typescript
client.contextAssembly.evaluateRules(data: EvaluateContextRulesRequest): Promise<unknown>
```

Evaluates context rules against provided data.

Runs the configured context rules to determine which context
sources should be included based on the current state.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `EvaluateContextRulesRequest` | Yes | The evaluation request with rule inputs |

## Returns

`Promise<unknown>` — A promise that resolves with the rule evaluation results

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.contextAssembly.evaluateRules(/* EvaluateContextRulesRequest */);
console.log(result);
```
