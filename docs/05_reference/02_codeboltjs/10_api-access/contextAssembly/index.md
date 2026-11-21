# Context Assembly

Assemble context for an application request.

## When to use it

Validate context inputs, inspect which variables the requested memory types need, then assemble retrieval results for a prompt.

## Examples

### Quick Start Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Assemble context
  const result = await codebolt.contextAssembly.getContext({
    scope_variables: {
      input: 'How do I reset my password?',
      userId: 'user-123',
      sessionId: 'session-456'
    },
    explicit_memory: ['episodic', 'semantic'],
    constraints: {
      max_tokens: 4000,
      max_sources: 10,
      timeout_ms: 5000
    }
  });

  if (result.success) {
    if (result.data == null) throw new Error('The response is missing data.');
    const { contributions, total_tokens } = result.data.context;

    console.log(`Assembled ${total_tokens} tokens from ${contributions.length} sources`);

    contributions.forEach(contrib => {
      console.log(`- ${contrib.memory_label}: ${contrib.tokens} tokens`);
    });
  }
});
```

### List Available Memory Types

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const types = await codebolt.contextAssembly.listMemoryTypes();

  if (types.data == null) throw new Error('The response is missing data.');
  types.data.memoryTypes.forEach(type => {
    console.log(`- ${type.label}: ${type.description}`);
    console.log(`  Required: ${type.inputs_scope.join(', ')}`);
  });
});
```

### Get Required Variables

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const vars = await codebolt.contextAssembly.getRequiredVariables([
    'episodic',
    'semantic'
  ]);

  if (vars.data == null) throw new Error('The response is missing data.');
  console.log('Scope variables:', vars.data.scope_variables);
  console.log('Additional variables:', vars.data.additional_variables);
});
```

### Evaluate Rules Only

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const rules = await codebolt.contextAssembly.evaluateRules({
    scope_variables: {
      input: 'Fix the authentication bug',
      task_type: 'debugging'
    }
  });

  if (rules.data == null) throw new Error('The response is missing data.');
  console.log('Matched rules:', rules.data.matched_rules);
  console.log('Included memories:', rules.data.included_memories);
});
```

## SDK methods

### getContext

[`getContext`](getContext.md) · Assemble context from various memory sources.

### validate

[`validate`](validate.md) · Validate a context assembly request.

### listMemoryTypes

[`listMemoryTypes`](listMemoryTypes.md) · List available memory types.

### evaluateRules

[`evaluateRules`](evaluateRules.md) · Evaluate rules only without fetching memory content.

### getRequiredVariables

[`getRequiredVariables`](getRequiredVariables.md) · Get required variables for specific memory types.
