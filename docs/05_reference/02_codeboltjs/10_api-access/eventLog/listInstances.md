---
name: listInstances
description: List all event log instances.
cbbaseinfo:
  description: List all event log instances.
data:
  name: listInstances
  category: eventLog
  link: listInstances.md
---

# listInstances

```text
codebolt.eventLog.listInstances(): Promise<EventLogInstanceListResponse>
```

List all event log instances

## When to use it

Discover log instances before selecting one for a query or a reporting view.

## Examples

### List All Instances

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.eventLog.listInstances();

  if (result.success) {
    if (result.data == null) throw new Error('The response is missing data.');
    console.log(`Found ${result.data.instances.length} instances`);
    result.data.instances.forEach(instance => {
      console.log(`- ${instance.name} (${instance.id})`);
    });
  }
});
```

### Find Instance by Name

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.eventLog.listInstances();

  if (result.data == null) throw new Error('The response is missing data.');
  const instance = result.data.instances.find(
    i => i.name === 'user-activity'
  );

  if (instance) {
    console.log('Found instance:', instance.id);
  }
});
```
