---
name: getRequiredVariables
description: Get required variables for specific memory types.
cbbaseinfo:
  description: Get required variables for specific memory types.
data:
  name: getRequiredVariables
  category: contextAssembly
  link: getRequiredVariables.md
---

# getRequiredVariables

```text
codebolt.contextAssembly.getRequiredVariables(memoryNames: string[]): Promise<RequiredVariablesResponse>
```

Get required variables for specific memory types

## Parameters

- `memoryNames` — Array of memory type names

## When to use it

Prepare a context request by looking up the variables required by its selected memory definitions.

## Example

### Get Variables for Memory Types

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.contextAssembly.getRequiredVariables([
    'episodic',
    'semantic',
    'procedural'
  ]);

  if (result.data == null) throw new Error('The response is missing data.');
  console.log('Scope variables required:', result.data.scope_variables);
  console.log('Additional variables:', result.data.additional_variables);
});
```

## Prepare a request for two memory definitions

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.contextAssembly.getRequiredVariables(['project-notes', 'review-history']);
  if (result.success) console.log(result.data);
});
```
