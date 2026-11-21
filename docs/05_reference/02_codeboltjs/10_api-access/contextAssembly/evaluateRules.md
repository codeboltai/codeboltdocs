---
name: evaluateRules
description: Evaluate rules only without fetching memory content.
cbbaseinfo:
  description: Evaluate rules only without fetching memory content.
data:
  name: evaluateRules
  category: contextAssembly
  link: evaluateRules.md
---

# evaluateRules

```text
codebolt.contextAssembly.evaluateRules(request: ContextAssemblyRequest, ruleEngineIds?: string[]): Promise<RuleEvaluationResponse>
```

Evaluate rules only without fetching memory content

## Parameters

- `request` — Context assembly request
- `ruleEngineIds` — Optional specific rule engine IDs to evaluate

## When to use it

Preview rule selection for a request when you need to understand which memories would be included before running retrieval.

## Examples

### Evaluate All Rules

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.contextAssembly.evaluateRules({
    scope_variables: {
      input: 'Debug the authentication bug',
      task_type: 'debugging',
      priority: 'high'
    }
  });

  if (result.data == null) throw new Error('The response is missing data.');
  console.log('Matched rules:', result.data.matched_rules);
  console.log('Included memories:', result.data.included_memories);
  console.log('Excluded memories:', result.data.excluded_memories);
  console.log('Forced memories:', result.data.forced_memories);
});
```

### Evaluate Specific Rule Engines

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.contextAssembly.evaluateRules(
    {
      scope_variables: {
        input: 'Fix the API endpoint',
        task_type: 'development'
      }
    },
    ['debugging-rules', 'development-rules']
  );

  if (result.data == null) throw new Error('The response is missing data.');
  console.log('Applied rules:', result.data.matched_rules);
});
```
