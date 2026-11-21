---
name: updateInstance
description: Update a KV store instance.
cbbaseinfo:
  description: Update a KV store instance.
data:
  name: updateInstance
  category: kvStore
  link: updateInstance.md
---

# updateInstance

```text
codebolt.kvStore.updateInstance(instanceId: string, updates: UpdateKVInstanceParams): Promise<KVInstanceResponse>
```

Update a KV store instance

## Parameters

- `instanceId` — Instance ID
- `updates` — Update parameters

## When to use it

Update a store's name or description as its purpose changes.

## Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.kvStore.updateInstance(
    'kv-instance-id',
    {
      description: 'Production cache for user session data and authentication tokens. Updated to reflect new usage patterns.'
    }
  );

  if (result.success) {
    console.log('Description updated');
  }
});
```

## More examples

### Update Instance Name

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.kvStore.updateInstance(
    'kv-instance-id',
    { name: 'production-cache' }
  );

  if (result.success) {
    if (result.data == null) throw new Error('The response is missing data.');
    console.log('Instance updated:', result.data.instance.name);
  } else {
    console.error('Failed to update instance:', result.error);
  }
});
```

### Update Both Name and Description

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.kvStore.updateInstance(
    'kv-instance-id',
    {
      name: 'prod-user-sessions-v2',
      description: 'Upgraded user session storage with enhanced security features'
    }
  );

  if (result.success) {
    if (result.data == null) throw new Error('The response is missing data.');
    const { name, description, updatedAt } = result.data.instance;
    console.log(`Updated "${name}" at ${new Date(updatedAt).toLocaleString()}`);
  }
});
```
