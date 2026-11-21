---
name: getPossibleVariables
description: Get all possible variables for UI configuration.
cbbaseinfo:
  description: Get all possible variables for UI configuration.
data:
  name: getPossibleVariables
  category: contextRuleEngine
  link: getPossibleVariables.md
---

# getPossibleVariables

```text
codebolt.contextRuleEngine.getPossibleVariables(): Promise<PossibleVariablesResponse>
```

Get all possible variables for UI configuration

## When to use it

Offer supported request variables in a rule editor or use them to check the conditions you plan to write.

## Examples

### List All Variables

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.contextRuleEngine.getPossibleVariables();

  if (result.data == null) throw new Error('The response is missing data.');
  result.data.variables.forEach(variable => {
    console.log(`- ${variable.name} (${variable.type})`);
    console.log(`  Source: ${variable.source}`);
    if (variable.description) {
      console.log(`  Description: ${variable.description}`);
    }
    if (variable.examples) {
      console.log(`  Examples:`, variable.examples);
    }
  });
});
```

### Filter by Source

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.contextRuleEngine.getPossibleVariables();

  if (result.data == null) throw new Error('The response is missing data.');
  const scopeVars = result.data.variables.filter(v => v.source === 'scope');
  if (result.data == null) throw new Error('The response is missing data.');
  const memoryVars = result.data.variables.filter(v => v.source === 'memory');
  if (result.data == null) throw new Error('The response is missing data.');
  const systemVars = result.data.variables.filter(v => v.source === 'system');

  console.log('Scope variables:', scopeVars.map(v => v.name));
  console.log('Memory variables:', memoryVars.map(v => v.name));
  console.log('System variables:', systemVars.map(v => v.name));
});
```

### Find Variables by Type

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.contextRuleEngine.getPossibleVariables();

  if (result.data == null) throw new Error('The response is missing data.');
  const stringVars = result.data.variables.filter(v => v.type === 'string');
  if (result.data == null) throw new Error('The response is missing data.');
  const boolVars = result.data.variables.filter(v => v.type === 'boolean');
  if (result.data == null) throw new Error('The response is missing data.');
  const numberVars = result.data.variables.filter(v => v.type === 'number');

  console.log('String variables:', stringVars.map(v => v.name));
  console.log('Boolean variables:', boolVars.map(v => v.name));
  console.log('Number variables:', numberVars.map(v => v.name));
});
```

### Help UI Construction

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  async function getVariableOptions() {
    const result = await codebolt.contextRuleEngine.getPossibleVariables();

    if (result.data == null) throw new Error('The response is missing data.');
    return result.data.variables.map(variable => ({
      value: variable.name,
      label: variable.name,
      type: variable.type,
      source: variable.source,
      description: variable.description,
      hint: variable.examples ? `Examples: ${variable.examples.join(', ')}` : undefined
    }));
  }

  const options = await getVariableOptions();
  // Use in UI dropdown for rule condition builder
});
```
