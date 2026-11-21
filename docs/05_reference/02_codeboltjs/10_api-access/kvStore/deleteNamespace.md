---
name: deleteNamespace
description: Delete an entire namespace from the KV store.
cbbaseinfo:
  description: Delete an entire namespace from the KV store.
data:
  name: deleteNamespace
  category: kvStore
  link: deleteNamespace.md
---

# deleteNamespace

```text
codebolt.kvStore.deleteNamespace(instanceId: string, namespace: string): Promise<KVDeleteNamespaceResponse>
```

Delete an entire namespace from the KV store

## Parameters

- `instanceId` — Instance ID
- `namespace` — Namespace to delete

## When to use it

Clear a group of related records, such as a cache namespace. Check the store and namespace before clearing it.

## Example

### Delete an Entire Namespace

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.kvStore.deleteNamespace(
    'kv-instance-id',
    'temp-cache'
  );

  if (result.success) {
    if (result.data == null) throw new Error('The response is missing data.');
    console.log(`Deleted ${result.data.deletedCount} records`);
  } else {
    console.error('Failed to delete namespace:', result.error);
  }
});
```
