---
name: get
description: Get a rule engine by ID.
cbbaseinfo:
  description: Get a rule engine by ID.
data:
  name: get
  category: contextRuleEngine
  link: get.md
---

# get

```text
codebolt.contextRuleEngine.get(id: string): Promise<ContextRuleEngineResponse>
```

Get a rule engine by ID

## Parameters

- `id` — Rule engine ID

## Examples

### Get Rule Engine

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.contextRuleEngine.get('engine-id-123');

  if (result.data == null) throw new Error('The response is missing data.');
  const engine = result.data.ruleEngine;
  console.log('Engine:', engine.name);
  console.log('Description:', engine.description);
  console.log('Enabled:', engine.enabled);
  console.log('Rules:', engine.rules.length);
});
```

### Display Rule Details

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.contextRuleEngine.get('engine-id-123');

  if (result.data == null) throw new Error('The response is missing data.');
  result.data.ruleEngine.rules.forEach(rule => {
    console.log(`Rule: ${rule.name}`);
    console.log(`  Conditions: ${rule.conditions.length}`);
    console.log(`  Action: ${rule.action}`);
    console.log(`  Logic: ${rule.condition_logic || 'and'}`);
    if (rule.action_config) {
      console.log(`  Config:`, rule.action_config);
    }
  });
});
```
