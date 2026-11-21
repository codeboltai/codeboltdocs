# Event Log

Create event streams and append or query events.

## When to use it

Use an event log instance to group workflow events that you want to query later.

## Examples

### Quick Start Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create an event log instance
  const instance = await codebolt.eventLog.createInstance(
    'user-activity',
    'Logs user actions and system events'
  );
  if (instance.data == null) throw new Error('The response is missing data.');
  console.log('Created instance:', instance.data.instance.id);

  // Append an event
  await codebolt.eventLog.appendEvent({
    instanceId: instance.data.instance.id,
    streamId: 'user-123',
    eventType: 'login',
    payload: {
      userId: 'user-123',
      timestamp: Date.now(),
      ip: '192.168.1.1'
    },
    metadata: {
      source: 'web-app',
      version: '1.0.0'
    }
  });

  // Query events
  if (instance.data == null) throw new Error('The response is missing data.');
  const result = await codebolt.eventLog.queryEvents({
    from: {
      instance: instance.data.instance.id,
      stream: 'user-123'
    },
    where: [
      { field: 'event_type', operator: 'eq', value: 'login' }
    ],
    orderBy: {
      field: 'timestamp',
      direction: 'desc'
    },
    limit: 10
  });

  if (result.data == null) throw new Error('The response is missing data.');
  console.log('Recent login events:', result.data.result.events);
});
```

### Audit Logging

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.eventLog.appendEvent({
    instanceId: 'audit-log',
    streamId: 'data-changes',
    eventType: 'record_updated',
    payload: {
      table: 'users',
      recordId: 'user-123',
      changes: { field: 'email', old: 'old@email.com', new: 'new@email.com' },
      performedBy: 'admin-1'
    }
  });
});
```

### Monitoring and Alerts

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.eventLog.appendEvent({
    instanceId: 'system-monitor',
    streamId: 'alerts',
    eventType: 'threshold_exceeded',
    payload: {
      metric: 'cpu_usage',
      value: 95,
      threshold: 80,
      severity: 'warning'
    }
  });
});
```

## SDK methods

### createInstance

[`createInstance`](createInstance.md) · Create a new event log instance.

### getInstance

[`getInstance`](getInstance.md) · Get an event log instance by ID.

### listInstances

[`listInstances`](listInstances.md) · List all event log instances.

### updateInstance

[`updateInstance`](updateInstance.md) · Update an event log instance.

### deleteInstance

[`deleteInstance`](deleteInstance.md) · Delete an event log instance.

### appendEvent

[`appendEvent`](appendEvent.md) · Append a single event to the log.

### appendEvents

[`appendEvents`](appendEvents.md) · Append multiple events to the log.

### queryEvents

[`queryEvents`](queryEvents.md) · Query events using DSL.

### getInstanceStats

[`getInstanceStats`](getInstanceStats.md) · Get instance statistics.
