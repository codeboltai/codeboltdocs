---
name: queryEvents
description: Query events using DSL.
cbbaseinfo:
  description: Query events using DSL.
data:
  name: queryEvents
  category: eventLog
  link: queryEvents.md
---

# queryEvents

```text
codebolt.eventLog.queryEvents(query: EventLogDSL): Promise<EventLogQueryResponse>
```

Query events using DSL

## Parameters

- `query` — Query DSL object

## When to use it

Retrieve events matching a time range or event filter to diagnose a run or build a report.

## Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.eventLog.queryEvents({
    from: { instance: 'api-log' },
    where: [
      { field: 'event_type', operator: 'eq', value: 'api_request' }
    ],
    orderBy: {
      field: 'timestamp',
      direction: 'desc'
    },
    limit: 100
  });
});
```

## More examples

### Query All Events in Stream

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.eventLog.queryEvents({
    from: {
      instance: 'user-activity-log',
      stream: 'user-123'
    },
    orderBy: {
      field: 'timestamp',
      direction: 'desc'
    },
    limit: 50
  });

  if (result.data == null) throw new Error('The response is missing data.');
  console.log(`Found ${result.data.result.total} events`);
  result.data.result.events?.forEach(event => {
    console.log(`${event.event_type}: ${event.timestamp}`);
  });
});
```

### Time Range Query

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const startTime = new Date('2024-01-01').getTime();
  const endTime = new Date('2024-01-31').getTime();

  const result = await codebolt.eventLog.queryEvents({
    from: { instance: 'system-events' },
    where: [
      { field: 'timestamp', operator: 'gte', value: startTime },
      { field: 'timestamp', operator: 'lte', value: endTime }
    ],
    orderBy: {
      field: 'timestamp',
      direction: 'asc'
    }
  });
});
```

### Aggregate by Event Type

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.eventLog.queryEvents({
    from: { instance: 'user-activity-log' },
    where: [
      { field: 'timestamp', operator: 'gte', value: Date.now() - 86400000 }
    ],
    reduce: {
      type: 'count',
      groupBy: ['event_type']
    }
  });

  if (result.data == null) throw new Error('The response is missing data.');
  console.log('Event counts by type:', result.data.result.aggregation);
});
```

### Complex Filter with Aggregation

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.eventLog.queryEvents({
    from: { instance: 'api-log' },
    where: [
      { field: 'event_type', operator: 'eq', value: 'api_request' },
      { field: 'payload.statusCode', operator: 'gte', value: 400 },
      { field: 'timestamp', operator: 'gte', value: Date.now() - 3600000 }
    ],
    reduce: {
      type: 'count',
      groupBy: ['payload.statusCode']
    },
    orderBy: {
      field: 'timestamp',
      direction: 'desc'
    }
  });

  if (result.data == null) throw new Error('The response is missing data.');
  console.log('Error counts by status code:', result.data.result.aggregation);
});
```
