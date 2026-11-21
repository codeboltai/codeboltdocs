---
name: list
description: List all rule engines.
cbbaseinfo:
  description: List all rule engines.
data:
  name: list
  category: contextRuleEngine
  link: list.md
---

# list

```text
codebolt.contextRuleEngine.list(): Promise<ContextRuleEngineListResponse>
```

List all rule engines

## Examples

### List All Rule Engines

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.contextRuleEngine.list();

  if (result.data == null) throw new Error('The response is missing data.');
  console.log(`Found ${result.data.ruleEngines.length} rule engines`);

  result.data.ruleEngines.forEach(engine => {
    console.log(`- ${engine.name} (${engine.id})`);
    console.log(`  Enabled: ${engine.enabled}`);
    console.log(`  Rules: ${engine.rules.length}`);
  });
});
```

### Find Enabled Engines

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.contextRuleEngine.list();

  if (result.data == null) throw new Error('The response is missing data.');
  const enabledEngines = result.data.ruleEngines.filter(e => e.enabled);

  console.log(`Active engines: ${enabledEngines.length}`);
});
```

### Find Engine by Name

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.contextRuleEngine.list();

  if (result.data == null) throw new Error('The response is missing data.');
  const engine = result.data.ruleEngines.find(
    e => e.name === 'task-rules'
  );

  if (engine) {
    console.log('Found engine:', engine.id);
  } else {
    console.log('Engine not found');
  }
});
```
