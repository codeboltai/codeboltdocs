---
name: update
description: Update a rule engine.
cbbaseinfo:
  description: Update a rule engine.
data:
  name: update
  category: contextRuleEngine
  link: update.md
---

# update

```text
codebolt.contextRuleEngine.update(id: string, updates: UpdateContextRuleEngineParams): Promise<ContextRuleEngineResponse>
```

Update a rule engine

## Parameters

- `id` — Rule engine ID
- `updates` — Update parameters

## Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.contextRuleEngine.update(
    'engine-id-123',
    {
      description: 'Updated description reflecting new rules'
    }
  );
});
```

## More examples

### Enable/Disable Engine

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Disable engine
  const result1 = await codebolt.contextRuleEngine.update(
    'engine-id-123',
    { enabled: false }
  );

  // Enable engine
  const result2 = await codebolt.contextRuleEngine.update(
    'engine-id-123',
    { enabled: true }
  );
});
```

### Update Rules

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const current = await codebolt.contextRuleEngine.get('engine-id-123');

  if (current.data == null) throw new Error('The response is missing data.');
  const updated = await codebolt.contextRuleEngine.update(
    'engine-id-123',
    {
      rules: [
        ...current.data.ruleEngine.rules,
        {
          name: 'New rule',
          conditions: [
            { variable: 'new_var', operator: 'eq', value: 'test' }
          ],
          action: 'include',
          action_config: { memory_ids: ['new_memory'] }
        }
      ]
    }
  );
});
```
