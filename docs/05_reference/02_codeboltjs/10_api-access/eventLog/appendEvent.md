---
name: appendEvent
description: Append a single event to the log.
cbbaseinfo:
  description: Append a single event to the log.
data:
  name: appendEvent
  category: eventLog
  link: appendEvent.md
---

# appendEvent

```text
codebolt.eventLog.appendEvent(params: AppendEventParams): Promise<EventLogAppendResponse>
```

Append a single event to the log

## Parameters

- `params` — Event parameters

## When to use it

Record an individual outcome with the event fields your workflow will later filter on.

## Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.eventLog.appendEvent({
    instanceId: 'new-instance',
    streamId: 'events',
    eventType: 'test_event',
    payload: { data: 'test' },
    autoCreateInstance: true
  });

  if (result.success) {
    console.log('Event logged (instance auto-created if needed)');
  }
});
```

## More examples

### Log User Login

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.eventLog.appendEvent({
    instanceId: 'user-activity-log',
    streamId: 'user-123',
    eventType: 'user_login',
    payload: {
      userId: 'user-123',
      timestamp: Date.now(),
      method: 'password',
      ip: '192.168.1.1'
    },
    metadata: {
      source: 'web-app',
      version: '1.0.0'
    }
  });

  if (result.data == null) throw new Error('The response is missing data.');
  console.log('Event logged, sequence:', result.data.event.sequence_number);
});
```

### Record API Call

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.eventLog.appendEvent({
    instanceId: 'api-log',
    streamId: 'api-calls',
    eventType: 'api_request',
    payload: {
      endpoint: '/api/users',
      method: 'GET',
      userId: 'user-123',
      responseTime: 125,
      statusCode: 200
    },
    metadata: {
      userAgent: 'Mozilla/5.0...',
      timestamp: Date.now()
    }
  });
});
```

### Log System Error

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.eventLog.appendEvent({
    instanceId: 'system-errors',
    streamId: 'errors',
    eventType: 'error_occurred',
    payload: {
      errorType: 'DatabaseConnectionError',
      message: 'Failed to connect to database',
      stack: 'Error: Failed to connect\n    at ...',
      service: 'payment-service',
      severity: 'critical'
    },
    metadata: {
      hostname: 'server-01',
      environment: 'production',
      timestamp: Date.now()
    }
  });
});
```
