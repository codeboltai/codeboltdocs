---
name: appendEvents
description: Append multiple events to the log.
cbbaseinfo:
  description: Append multiple events to the log.
data:
  name: appendEvents
  category: eventLog
  link: appendEvents.md
---

# appendEvents

```text
codebolt.eventLog.appendEvents(params: AppendEventsParams): Promise<EventLogAppendMultipleResponse>
```

Append multiple events to the log

## Parameters

- `params` — Events parameters

## When to use it

Record a batch of related events together, such as results from several steps of one job.

## Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.eventLog.appendEvents({
    instanceId: 'system-events',
    events: [
      { streamId: 'auth', eventType: 'login_attempt', payload: { userId: 'user-1' } },
      { streamId: 'database', eventType: 'query_executed', payload: { query: 'SELECT...' } },
      { streamId: 'cache', eventType: 'cache_miss', payload: { key: 'user-1' } }
    ]
  });
});
```

## More examples

### Batch User Activity Events

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.eventLog.appendEvents({
    instanceId: 'user-activity-log',
    events: [
      {
        streamId: 'user-123',
        eventType: 'page_view',
        payload: { page: '/home', duration: 5000 }
      },
      {
        streamId: 'user-123',
        eventType: 'page_view',
        payload: { page: '/profile', duration: 3000 }
      },
      {
        streamId: 'user-123',
        eventType: 'button_click',
        payload: { button: 'save', page: '/profile' }
      }
    ]
  });

  if (result.data == null) throw new Error('The response is missing data.');
  console.log(`Logged ${result.data.count} events`);
});
```

### Import Historical Events

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const historicalEvents = [
    { streamId: 'order-1', eventType: 'OrderCreated', payload: { orderId: '1', total: 100 } },
    { streamId: 'order-1', eventType: 'OrderPaid', payload: { orderId: '1', amount: 100 } },
    { streamId: 'order-1', eventType: 'OrderShipped', payload: { orderId: '1', tracking: 'ABC123' } }
  ];

  const result = await codebolt.eventLog.appendEvents({
    instanceId: 'order-events',
    events: historicalEvents
  });

  if (result.data == null) throw new Error('The response is missing data.');
  console.log(`Imported ${result.data.count} historical events`);
});
```

### Performance Monitoring Batch

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const metrics = [
    { streamId: 'api-metrics', eventType: 'request', payload: { endpoint: '/users', duration: 120 } },
    { streamId: 'api-metrics', eventType: 'request', payload: { endpoint: '/users', duration: 95 } },
    { streamId: 'api-metrics', eventType: 'request', payload: { endpoint: '/users', duration: 110 } }
  ];

  const result = await codebolt.eventLog.appendEvents({
    instanceId: 'performance-log',
    events: metrics
  });

  if (result.data == null) throw new Error('The response is missing data.');
  console.log(`Logged ${result.data.count} performance metrics`);
});
```

### State Transition Events

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const stateTransitions = [
    { streamId: 'order-456', eventType: 'OrderCreated', payload: { state: 'created' } },
    { streamId: 'order-456', eventType: 'OrderValidated', payload: { state: 'validated' } },
    { streamId: 'order-456', eventType: 'OrderConfirmed', payload: { state: 'confirmed' } }
  ];

  const result = await codebolt.eventLog.appendEvents({
    instanceId: 'order-state-log',
    events: stateTransitions,
    autoCreateInstance: true
  });
});
```
