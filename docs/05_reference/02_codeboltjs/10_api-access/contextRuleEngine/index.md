# Context Rule Engine

Manage context rules and evaluate conditions.

## When to use it

Use rules to include relevant memory based on task or project inputs. Evaluate representative requests before relying on a rule in a workflow.

## Examples

### Quick Start Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a rule engine
  const engine = await codebolt.contextRuleEngine.create({
    name: 'debugging-rules',
    description: 'Rules for debugging tasks',
    rules: [
      {
        name: 'Include error logs',
        conditions: [
          { variable: 'task_type', operator: 'eq', value: 'debugging' }
        ],
        action: 'include',
        action_config: {
          memory_ids: ['error_logs', 'system_logs']
        }
      },
      {
        name: 'Prioritize recent code',
        conditions: [
          { variable: 'task_type', operator: 'eq', value: 'debugging' },
          { variable: 'priority', operator: 'eq', value: 'high' }
        ],
        action: 'set_priority',
        action_config: {
          memory_ids: ['recent_commits'],
          priority: 10
        }
      }
    ],
    enabled: true
  });

  if (engine.data == null) throw new Error('The response is missing data.');
  console.log('Created rule engine:', engine.data.ruleEngine.id);

  // Evaluate rules
  const result = await codebolt.contextRuleEngine.evaluate({
    scope_variables: {
      task_type: 'debugging',
      priority: 'high'
    }
  });

  if (result.data == null) throw new Error('The response is missing data.');
  console.log('Included memories:', result.data.included_memories);
  console.log('Forced memories:', result.data.forced_memories);
});
```

### Task-Based Memory Selection

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const engine = await codebolt.contextRuleEngine.create({
    name: 'task-based-selection',
    rules: [
      {
        name: 'Development task',
        conditions: [
          { variable: 'task_type', operator: 'eq', value: 'development' }
        ],
        action: 'include',
        action_config: { memory_ids: ['codebase', 'documentation'] }
      },
      {
        name: 'Debugging task',
        conditions: [
          { variable: 'task_type', operator: 'eq', value: 'debugging' }
        ],
        action: 'include',
        action_config: { memory_ids: ['error_logs', 'recent_commits'] }
      }
    ]
  });
});
```

### Priority-Based Selection

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const engine = await codebolt.contextRuleEngine.create({
    name: 'priority-rules',
    rules: [
      {
        name: 'High priority task',
        conditions: [
          { variable: 'priority', operator: 'eq', value: 'high' }
        ],
        action: 'force_include',
        action_config: { memory_ids: ['urgent_fixes', 'critical_docs'] }
      }
    ]
  });
});
```

### User-Context Rules

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const engine = await codebolt.contextRuleEngine.create({
    name: 'user-context-rules',
    rules: [
      {
        name: 'New user',
        conditions: [
          { variable: 'user_level', operator: 'eq', value: 'beginner' }
        ],
        action: 'include',
        action_config: { memory_ids: ['tutorials', 'examples'] }
      },
      {
        name: 'Expert user',
        conditions: [
          { variable: 'user_level', operator: 'eq', value: 'expert' }
        ],
        action: 'include',
        action_config: { memory_ids: ['advanced_docs', 'api_reference'] }
      }
    ]
  });
});
```

### Testing

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Test rules before deployment
  const result = await codebolt.contextRuleEngine.evaluate({
    scope_variables: {
      task_type: 'debugging',
      priority: 'high'
    }
  });

  console.log('Test result:', result.data);
});
```

## SDK methods

### create

[`create`](create.md) · Create a new rule engine.

### get

[`get`](get.md) · Get a rule engine by ID.

### list

[`list`](list.md) · List all rule engines.

### update

[`update`](update.md) · Update a rule engine.

### delete

[`delete`](delete.md) · Delete a rule engine.

### evaluate

[`evaluate`](evaluate.md) · Evaluate rules against provided variables.

### getPossibleVariables

[`getPossibleVariables`](getPossibleVariables.md) · Get all possible variables for UI configuration.
