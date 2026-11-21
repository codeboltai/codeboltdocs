---
name: updateInstance
description: Update an event log instance.
cbbaseinfo:
  description: Update an event log instance.
data:
  name: updateInstance
  category: eventLog
  link: updateInstance.md
---

# updateInstance

```text
codebolt.eventLog.updateInstance(instanceId: string, updates: UpdateEventLogInstanceParams): Promise<EventLogInstanceResponse>
```

Update an event log instance

## Parameters

- `instanceId` — Instance ID
- `updates` — Update parameters

## Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.eventLog.updateInstance(
    'log-instance-id',
    { description: 'Updated description reflecting new usage patterns' }
  );
});
```

## More examples

### Update Instance Name

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.eventLog.updateInstance(
    'log-instance-id',
    { name: 'production-user-activity' }
  );
});
```
