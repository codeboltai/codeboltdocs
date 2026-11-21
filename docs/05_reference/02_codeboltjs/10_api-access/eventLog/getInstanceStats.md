---
name: getInstanceStats
description: Get instance statistics.
cbbaseinfo:
  description: Get instance statistics.
data:
  name: getInstanceStats
  category: eventLog
  link: getInstanceStats.md
---

# getInstanceStats

```text
codebolt.eventLog.getInstanceStats(instanceId: string): Promise<EventLogStatsResponse>
```

Get instance statistics

## Parameters

- `instanceId` — Instance ID

## When to use it

Inspect the event counts and available statistics for one log instance.

## Example

### Get Instance Statistics

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.eventLog.getInstanceStats('log-instance-id');

  if (result.success) {
    if (result.data == null) throw new Error('The response is missing data.');
    console.log(`Instance: ${result.data.name}`);
    console.log(`Total events: ${result.data.eventCount}`);
    console.log(`Created: ${new Date(result.data.createdAt).toLocaleString()}`);
  }
});
```
