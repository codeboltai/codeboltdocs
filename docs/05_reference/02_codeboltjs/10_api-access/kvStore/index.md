# Kv Store

Manage key-value stores and entries.

## Write and read a value

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const created = await codebolt.kvStore.createInstance('project-status');
  const instanceId = created.data?.instance.id;
  if (!created.success || !instanceId) {
    throw new Error(created.error ?? 'Could not create the store.');
  }

  const saved = await codebolt.kvStore.set(instanceId, 'reviews', 'README.md', 'pending');
  if (!saved.success) throw new Error(saved.error ?? 'Could not save the value.');

  const result = await codebolt.kvStore.get(instanceId, 'reviews', 'README.md');
  console.log(result);
});
```

## When to use it

Store configuration, cached results, or workflow checkpoints under keys. Use a namespace to group records you want to query or clear together.

## SDK methods

### createInstance

[`createInstance`](createInstance.md) · Create a new KV store instance.

### getInstance

[`getInstance`](getInstance.md) · Get a KV store instance by ID.

### listInstances

[`listInstances`](listInstances.md) · List all KV store instances.

### updateInstance

[`updateInstance`](updateInstance.md) · Update a KV store instance.

### deleteInstance

[`deleteInstance`](deleteInstance.md) · Delete a KV store instance.

### get

[`get`](get.md) · Get a value from the KV store.

### set

[`set`](set.md) · Set a value in the KV store.

### delete

[`delete`](delete.md) · Delete a value from the KV store.

### deleteNamespace

[`deleteNamespace`](deleteNamespace.md) · Delete an entire namespace from the KV store.

### query

[`query`](query.md) · Query the KV store using DSL.

### getNamespaces

[`getNamespaces`](getNamespaces.md) · Get all namespaces in an instance.

### getRecordCount

[`getRecordCount`](getRecordCount.md) · Get record count for an instance or namespace.
