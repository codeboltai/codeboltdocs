---
name: createInstance
description: Create a new event log instance.
cbbaseinfo:
  description: Create a new event log instance.
data:
  name: createInstance
  category: eventLog
  link: createInstance.md
---

# createInstance

```text
codebolt.eventLog.createInstance(name: string, description?: string): Promise<EventLogInstanceResponse>
```

Create a new event log instance

## Parameters

- `name` — Instance name
- `description` — Optional description

## When to use it

Create a separate stream for events you want to query independently, such as review outcomes and pipeline runs.

## Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.eventLog.createInstance(
    'order-events',
    'Event sourcing log for order management system. Contains all events ' +
    'related to orders from creation to fulfillment.'
  );
});
```

## More examples

### Create Basic Instance

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.eventLog.createInstance(
    'user-activity',
    'Logs user actions and system events'
  );

  if (result.success) {
    if (result.data == null) throw new Error('The response is missing data.');
    console.log('Created instance:', result.data.instance.id);
  }
});
```

### Create Instance for Audit Trail

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.eventLog.createInstance(
    'audit-trail',
    'Comprehensive audit log for all data modifications and access'
  );

  if (result.success) {
    console.log('Audit log instance ready');
  }
});
```

### Create Multiple Instances for Different Purposes

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const logs = [
    { name: 'user-activity', desc: 'User actions and interactions' },
    { name: 'system-events', desc: 'System-level events and errors' },
    { name: 'api-calls', desc: 'API request and response logging' }
  ];

  for (const log of logs) {
    const result = await codebolt.eventLog.createInstance(log.name, log.desc);
    if (result.success) {
      if (result.data == null) throw new Error('The response is missing data.');
      console.log(`Created ${log.name}: ${result.data.instance.id}`);
    }
  }
});
```

### Create with Detailed Description

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.eventLog.createInstance(
    'security-events',
    'Security-related events including login attempts, permission changes, ' +
    'and potential threats. Used for security monitoring and compliance auditing.'
  );
});
```
