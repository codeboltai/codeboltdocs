---
name: create
description: Create a new rule engine.
cbbaseinfo:
  description: Create a new rule engine.
data:
  name: create
  category: contextRuleEngine
  link: create.md
---

# create

```text
codebolt.contextRuleEngine.create(config: CreateContextRuleEngineParams): Promise<ContextRuleEngineResponse>
```

Create a new rule engine

## Parameters

- `config` — Rule engine configuration

## When to use it

Define when a set of memories should be considered for context assembly.

## Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.contextRuleEngine.create({
    name: 'flexible-rules',
    rules: [
      {
        name: 'Important tasks',
        conditions: [
          { variable: 'priority', operator: 'in', value: ['high', 'urgent'] }
        ],
        condition_logic: 'or',
        action: 'include',
        action_config: { memory_ids: ['priority_docs'] }
      }
    ]
  });
});
```

## More examples

### Create Basic Rule Engine

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.contextRuleEngine.create({
    name: 'task-rules',
    description: 'Rules for task-based memory selection',
    rules: [
      {
        name: 'Debugging task',
        conditions: [
          { variable: 'task_type', operator: 'eq', value: 'debugging' }
        ],
        action: 'include',
        action_config: {
          memory_ids: ['error_logs', 'recent_commits']
        }
      }
    ],
    enabled: true
  });

  if (result.data == null) throw new Error('The response is missing data.');
  console.log('Created:', result.data.ruleEngine.id);
});
```

### Create with Multiple Rules

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.contextRuleEngine.create({
    name: 'comprehensive-rules',
    description: 'Comprehensive rule set for context selection',
    rules: [
      {
        name: 'High priority',
        conditions: [
          { variable: 'priority', operator: 'eq', value: 'high' }
        ],
        action: 'force_include',
        action_config: { memory_ids: ['urgent_docs'] },
        order: 1
      },
      {
        name: 'Development task',
        conditions: [
          { variable: 'task_type', operator: 'eq', value: 'development' }
        ],
        action: 'include',
        action_config: { memory_ids: ['codebase', 'api_docs'] },
        order: 2
      },
      {
        name: 'Exclude archived',
        conditions: [
          { variable: 'status', operator: 'eq', value: 'archived' }
        ],
        action: 'exclude',
        action_config: { memory_ids: ['archived_data'] },
        order: 3
      }
    ]
  });
});
```

### Create Priority Rule

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.contextRuleEngine.create({
    name: 'priority-engine',
    rules: [
      {
        name: 'Boost recent code',
        conditions: [
          { variable: 'task_type', operator: 'eq', value: 'debugging' }
        ],
        action: 'set_priority',
        action_config: {
          memory_ids: ['recent_commits', 'recent_changes'],
          priority: 10
        }
      }
    ]
  });
});
```

### Create with Complex Conditions

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.contextRuleEngine.create({
    name: 'advanced-rules',
    rules: [
      {
        name: 'Expert debugging',
        conditions: [
          { variable: 'task_type', operator: 'eq', value: 'debugging' },
          { variable: 'user_level', operator: 'eq', value: 'expert' }
        ],
        action: 'include',
        action_config: {
          memory_ids: ['advanced_debugging', 'system_logs', 'performance_metrics']
        }
      },
      {
        name: 'Beginner debugging',
        conditions: [
          { variable: 'task_type', operator: 'eq', value: 'debugging' },
          { variable: 'user_level', operator: 'eq', value: 'beginner' }
        ],
        action: 'include',
        action_config: {
          memory_ids: ['tutorials', 'examples', 'basic_debugging']
        }
      }
    ]
  });
});
```

### Create Disabled Engine

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.contextRuleEngine.create({
    name: 'experimental-rules',
    description: 'Experimental rules for testing',
    rules: [
      {
        name: 'Test rule',
        conditions: [
          { variable: 'test', operator: 'eq', value: 'true' }
        ],
        action: 'include',
        action_config: { memory_ids: ['test_memory'] }
      }
    ],
    enabled: false  // Disabled by default
  });

  console.log('Engine created but disabled');
});
```
