---
name: delete
description: Delete a value from the KV store.
cbbaseinfo:
  description: Delete a value from the KV store.
data:
  name: delete
  category: kvStore
  link: delete.md
---

# delete

```text
codebolt.kvStore.delete(instanceId: string, namespace: string, key: string): Promise<KVDeleteResponse>
```

Delete a value from the KV store

## Parameters

- `instanceId` — Instance ID
- `namespace` — Namespace
- `key` — Key

## When to use it

Remove a cached or temporary value by its key inside a namespace.

## Example

### Delete a Single Key

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.kvStore.delete(
    'kv-instance-id',
    'temp-cache',
    'expired-key'
  );

  if (result.success) {
    if (result.data == null) throw new Error('The response is missing data.');
    if (result.data.deleted) {
      console.log('Key deleted successfully');
    } else {
      console.log('Key did not exist');
    }
  } else {
    console.error('Failed to delete:', result.error);
  }
});
```
