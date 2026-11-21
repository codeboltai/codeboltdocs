---
name: createInstance
description: Create a new KV store instance.
cbbaseinfo:
  description: Create a new KV store instance.
data:
  name: createInstance
  category: kvStore
  link: createInstance.md
---

# createInstance

```text
codebolt.kvStore.createInstance(name: string, description?: string): Promise<KVInstanceResponse>
```

Create a new KV store instance

## Parameters

- `name` — Instance name
- `description` — Optional description

## When to use it

Create a named store for a specific kind of data, such as task checkpoints or a cache.

## Examples

### Create a Basic Instance

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.kvStore.createInstance(
    'user-sessions',
    'Stores active user session data'
  );

  if (result.success) {
    if (result.data == null) throw new Error('The response is missing data.');
    console.log('Instance created with ID:', result.data.instance.id);
    console.log('Instance name:', result.data.instance.name);
    // Use the instance ID for subsequent operations
  } else {
    console.error('Failed to create instance:', result.error);
  }
});
```

### Create Instance with Minimal Parameters

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.kvStore.createInstance('cache');

  if (result.success) {
    if (result.data == null) throw new Error('The response is missing data.');
    const { id, name, createdAt } = result.data.instance;
    console.log(`Created ${name} (${id}) at ${createdAt}`);
  }
});
```

### Create Instance with Detailed Description

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.kvStore.createInstance(
    'agent-workflow-state',
    'Stores the current state of agent workflows including step numbers, ' +
    'context variables, and intermediate results. Used for resuming ' +
    'interrupted workflows and debugging agent behavior.'
  );

  if (result.success) {
    if (result.data == null) throw new Error('The response is missing data.');
    console.log('Workflow state instance ready:', result.data.instance.id);
  }
});
```

### Error Handling for Duplicate Names

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const instanceName = 'shared-config';
  let instanceId;

  const result = await codebolt.kvStore.createInstance(
    instanceName,
    'Shared configuration data'
  );

  if (result.success) {
    if (result.data == null) throw new Error('The response is missing data.');
    instanceId = result.data.instance.id;
    console.log('New instance created:', instanceId);
  } else {
    // Check if instance already exists by listing instances
    const listResult = await codebolt.kvStore.listInstances();
    if (listResult.data == null) throw new Error('The response is missing data.');
    const existing = listResult.data.instances.find(
      i => i.name === instanceName
    );

    if (existing) {
      instanceId = existing.id;
      console.log('Using existing instance:', instanceId);
    } else {
      throw new Error(`Failed to create instance: ${result.error}`);
    }
  }
});
```

### Create Instance for Temporary Data

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.kvStore.createInstance(
    'temp-cache',
    'Temporary cache for API responses and computed results. ' +
    'Data in this instance should be considered volatile.'
  );

  if (result.success) {
    // Store data with short TTL concept
    const cacheData = {
      response: { /* API response */ },
      cachedAt: Date.now(),
      ttl: 300000 // 5 minutes
    };

    if (result.data == null) throw new Error('The response is missing data.');
    await codebolt.kvStore.set(
      result.data.instance.id,
      'api-cache',
      'endpoint-data',
      cacheData
    );
  }
});
```
