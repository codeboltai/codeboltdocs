---
name: delete
description: Delete a rule engine.
cbbaseinfo:
  description: Delete a rule engine.
data:
  name: delete
  category: contextRuleEngine
  link: delete.md
---

# delete

```text
codebolt.contextRuleEngine.delete(id: string): Promise<ContextRuleEngineDeleteResponse>
```

Delete a rule engine

## Parameters

- `id` — Rule engine ID

## Example

### Delete Rule Engine

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.contextRuleEngine.delete('engine-id-123');

  if (result.data == null) throw new Error('The response is missing data.');
  if (result.success && result.data.deleted) {
    console.log('Rule engine deleted');
  }
});
```
