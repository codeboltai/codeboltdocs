---
name: listMemoryTypes
description: List available memory types.
cbbaseinfo:
  description: List available memory types.
data:
  name: listMemoryTypes
  category: contextAssembly
  link: listMemoryTypes.md
---

# listMemoryTypes

```text
codebolt.contextAssembly.listMemoryTypes(): Promise<MemoryTypesResponse>
```

List available memory types

## When to use it

Discover memory types to offer in a context configuration UI.

## Examples

### List All Memory Types

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.contextAssembly.listMemoryTypes();

  if (result.data == null) throw new Error('The response is missing data.');
  result.data.memoryTypes.forEach(type => {
    console.log(`- ${type.label} (${type.id})`);
    console.log(`  ${type.description || 'No description'}`);
    console.log(`  Format: ${type.contribution.format}`);
    console.log(`  Required: ${type.inputs_scope.join(', ')}`);
    console.log('');
  });
});
```

### Find Memory Types by ID

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.contextAssembly.listMemoryTypes();

  if (result.data == null) throw new Error('The response is missing data.');
  const episodic = result.data.memoryTypes.find(t => t.id === 'episodic');

  if (episodic) {
    console.log('Episodic Memory:');
    console.log('  Description:', episodic.description);
    console.log('  Required variables:', episodic.inputs_scope);
    console.log('  Additional variables:', episodic.additional_variables);
  }
});
```

### Build Memory Type Selector

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  async function getMemoryTypeSelector() {
    const result = await codebolt.contextAssembly.listMemoryTypes();

    if (result.data == null) throw new Error('The response is missing data.');
    return result.data.memoryTypes.map(type => ({
      value: type.id,
      label: type.label,
      description: type.description,
      requiredVars: type.inputs_scope
    }));
  }

  const selector = await getMemoryTypeSelector();
  console.log('Available memory types:', selector);
});
```
