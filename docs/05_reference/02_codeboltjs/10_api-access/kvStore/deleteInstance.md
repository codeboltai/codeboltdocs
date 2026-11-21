---
name: deleteInstance
description: Delete a KV store instance.
cbbaseinfo:
  description: Delete a KV store instance.
data:
  name: deleteInstance
  category: kvStore
  link: deleteInstance.md
---

# deleteInstance

```text
codebolt.kvStore.deleteInstance(instanceId: string): Promise<KVDeleteResponse>
```

Delete a KV store instance

## Parameters

- `instanceId` — Instance ID

## When to use it

Remove a test or retired store after checking its ID and which data it contains.

## Examples

### Delete an Instance

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.kvStore.deleteInstance('kv-instance-id');

  if (result.success) {
    if (result.data == null) throw new Error('The response is missing data.');
    if (result.data.deleted) {
      console.log('Instance deleted successfully');
    } else {
      console.log('Instance not found');
    }
  } else {
    console.error('Failed to delete instance:', result.error);
  }
});
```

### Batch Delete Old Instances

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  async function deleteOldInstances(daysThreshold = 30) {
    // List all instances
    const listResult = await codebolt.kvStore.listInstances();

    if (!listResult.success) {
      return [];
    }

    const threshold = Date.now() - (daysThreshold * 24 * 60 * 60 * 1000);
    if (listResult.data == null) throw new Error('The response is missing data.');
    const oldInstances = listResult.data.instances.filter(
      instance => new Date(instance.createdAt).getTime() < threshold
    );

    console.log(`Found ${oldInstances.length} instances older than ${daysThreshold} days`);

    const deleted = [];

    for (const instance of oldInstances) {
      const result = await codebolt.kvStore.deleteInstance(instance.id);

      if (result.data == null) throw new Error('The response is missing data.');
      if (result.success && result.data.deleted) {
        deleted.push(instance);
        console.log(`Deleted: ${instance.name}`);
      }
    }

    return deleted;
  }

  // Usage: Delete instances older than 90 days
  const deleted = await deleteOldInstances(90);
  console.log(`Deleted ${deleted.length} old instances`);
});
```
