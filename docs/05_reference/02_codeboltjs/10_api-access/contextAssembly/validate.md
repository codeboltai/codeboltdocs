---
name: validate
description: Validate a context assembly request.
cbbaseinfo:
  description: Validate a context assembly request.
data:
  name: validate
  category: contextAssembly
  link: validate.md
---

# validate

```text
codebolt.contextAssembly.validate(request: ContextAssemblyRequest): Promise<ContextValidateResponse>
```

Validate a context assembly request

## Parameters

- `request` — Request to validate

## When to use it

Check a context request before assembling it. Resolve the reported validation issues before running retrieval.

## Examples

### Validate Request

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.contextAssembly.validate({
    scope_variables: {
      input: 'test message'
    },
    explicit_memory: ['episodic', 'semantic']
  });

  if (result.data == null) throw new Error('The response is missing data.');
  if (result.data.validation.valid) {
    console.log('Request is valid');
  } else {
    if (result.data == null) throw new Error('The response is missing data.');
    console.error('Validation errors:', result.data.validation.errors);
  }
});
```

### Check Memory Availability

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.contextAssembly.validate({
    scope_variables: { input: 'test' },
    explicit_memory: ['episodic', 'semantic', 'custom-type']
  });

  if (result.data == null) throw new Error('The response is missing data.');
  console.log('Resolved memories:', result.data.validation.resolved_memories);

  // Check if all requested memories are available
  const requested = ['episodic', 'semantic', 'custom-type'];
  if (result.data == null) throw new Error('The response is missing data.');
  const resolved = result.data.validation.resolved_memories || [];
  const missing = requested.filter(m => !resolved.includes(m));

  if (missing.length > 0) {
    console.warn('Missing memory types:', missing);
  }
});
```

### Validate Constraints

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.contextAssembly.validate({
    scope_variables: { input: 'test' },
    constraints: {
      max_tokens: 100,
      max_sources: 1
    }
  });

  if (result.data == null) throw new Error('The response is missing data.');
  if (!result.data.validation.valid) {
    if (result.data == null) throw new Error('The response is missing data.');
    console.error('Constraints too restrictive:', result.data.validation.errors);
  }
});
```
