---
name: deleteInstance
description: Delete an event log instance.
cbbaseinfo:
  description: Delete an event log instance.
data:
  name: deleteInstance
  category: eventLog
  link: deleteInstance.md
---

# deleteInstance

```text
codebolt.eventLog.deleteInstance(instanceId: string): Promise<EventLogInstanceResponse>
```

Delete an event log instance

## Parameters

- `instanceId` — Instance ID

## Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.eventLog.deleteInstance('log-instance-id');

  if (result.success) {
    console.log('Instance deleted');
  }
});
```
