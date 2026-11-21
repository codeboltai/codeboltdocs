---
name: evaluate
description: Evaluate rules against provided variables.
cbbaseinfo:
  description: Evaluate rules against provided variables.
data:
  name: evaluate
  category: contextRuleEngine
  link: evaluate.md
---

# evaluate

```text
codebolt.contextRuleEngine.evaluate(params: EvaluateRulesParams): Promise<EvaluateRulesResponse>
```

Evaluate rules against provided variables

## Parameters

- `params` — Evaluation parameters

## When to use it

Compare rule outcomes for different inputs while debugging memory selection.

## Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.contextRuleEngine.evaluate({
    scope_variables: {
      task_type: 'development'
    },
    rule_engine_ids: ['task-rules', 'priority-rules']
  });

  console.log('Results from specific engines:', result.data);
});
```

## More examples

### Evaluate All Rules

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.contextRuleEngine.evaluate({
    scope_variables: {
      task_type: 'debugging',
      priority: 'high',
      user_level: 'expert'
    }
  });

  if (result.data == null) throw new Error('The response is missing data.');
  console.log('Matched rules:', result.data.matched_rules);
  console.log('Included memories:', result.data.included_memories);
  console.log('Excluded memories:', result.data.excluded_memories);
  console.log('Forced memories:', result.data.forced_memories);
});
```
