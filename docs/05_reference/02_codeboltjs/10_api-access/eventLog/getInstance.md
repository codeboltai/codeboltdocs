---
name: getInstance
description: Get an event log instance by ID.
cbbaseinfo:
  description: Get an event log instance by ID.
data:
  name: getInstance
  category: eventLog
  link: getInstance.md
---

# getInstance

```text
codebolt.eventLog.getInstance(instanceId: string): Promise<EventLogInstanceResponse>
```

Get an event log instance by ID

## Parameters

- `instanceId` — Instance ID

## When to use it

Read an instance's metadata before querying or updating it.

## Example

### Get Instance Details

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.eventLog.getInstance('log-instance-id');

  if (result.success) {
    if (result.data == null) throw new Error('The response is missing data.');
    const { id, name, description, createdAt } = result.data.instance;
    console.log(`Instance: ${name} (${id})`);
    console.log(`Created: ${new Date(createdAt).toLocaleString()}`);
  }
});
```
