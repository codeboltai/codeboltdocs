---
name: getContext
description: Assemble context from various memory sources.
cbbaseinfo:
  description: Assemble context from various memory sources.
data:
  name: getContext
  category: contextAssembly
  link: getContext.md
---

# getContext

```text
codebolt.contextAssembly.getContext(request: ContextAssemblyRequest): Promise<ContextAssemblyResponse>
```

Assemble context from various memory sources

## Parameters

- `request` — Context assembly request

## When to use it

Build context for a specific task by supplying the relevant inputs and memory selectors. Check the assembly result before adding it to the model request.

## Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.contextAssembly.getContext({
    scope_variables: {
      input: 'Update the user profile feature',
      userId: 'user-123'
    },
    additional_variables: {
      currentProject: 'frontend-app',
      feature: 'user-profile',
      files: ['/src/profile.tsx', '/src/api/user.ts']
    },
    explicit_memory: ['procedural', 'semantic']
  });
});
```

## More examples

### Basic Context Assembly

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.contextAssembly.getContext({
    scope_variables: {
      input: 'How do I reset my password?',
      userId: 'user-123'
    }
  });

  if (result.success) {
    if (result.data == null) throw new Error('The response is missing data.');
    const { contributions, total_tokens } = result.data.context;

    console.log(`Assembled ${total_tokens} tokens from ${contributions.length} sources`);

    // Combine all contributions
    const fullContext = contributions
      .map(c => c.content)
      .join('\n\n');
  }
});
```

### Assemble with Explicit Memory Types

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.contextAssembly.getContext({
    scope_variables: {
      input: 'What did we discuss about the API?',
      conversationId: 'conv-456'
    },
    explicit_memory: ['episodic', 'semantic'],
    constraints: {
      max_tokens: 4000,
      max_sources: 5
    }
  });

  if (result.data == null) throw new Error('The response is missing data.');
  result.data.context.contributions.forEach(contrib => {
    console.log(`${contrib.memory_label}: ${contrib.tokens} tokens`);
  });
});
```

### Assemble with Rule Engine

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.contextAssembly.getContext({
    scope_variables: {
      input: 'Debug the authentication issue',
      task_type: 'debugging',
      priority: 'high'
    },
    rule_engine_ids: ['debugging-rules', 'priority-rules'],
    constraints: {
      max_tokens: 6000,
      timeout_ms: 3000
    }
  });

  if (result.data == null) throw new Error('The response is missing data.');
  console.log('Applied rules:', result.data.context.applied_rules);
});
```

### Handle Warnings

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.contextAssembly.getContext({
    scope_variables: { input: 'test' },
    constraints: { max_tokens: 100 }
  });

  if (result.success) {
    if (result.data == null) throw new Error('The response is missing data.');
    if (result.data.context.warnings) {
      if (result.data == null) throw new Error('The response is missing data.');
      console.warn('Warnings:', result.data.context.warnings);
      // Handle warnings (e.g., truncated context)
    }

    if (result.data == null) throw new Error('The response is missing data.');
    const context = result.data.context;
    console.log(`Assembled ${context.total_tokens} tokens`);
  }
});
```
