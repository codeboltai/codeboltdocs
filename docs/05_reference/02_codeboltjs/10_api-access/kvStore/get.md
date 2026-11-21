---
name: get
description: Get a value from the KV store.
cbbaseinfo:
  description: Get a value from the KV store.
data:
  name: get
  category: kvStore
  link: get.md
---

# get

```text
codebolt.kvStore.get(instanceId: string, namespace: string, key: string): Promise<KVGetResponse>
```

Get a value from the KV store

## Parameters

- `instanceId` — Instance ID
- `namespace` — Namespace
- `key` — Key

## When to use it

Read a saved preference, checkpoint, or cached result using the store ID, namespace, and key.

## Example

### Retrieve a Simple Value

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.kvStore.get(
    'kv-instance-id',
    'user-preferences',
    'theme'
  );

  if (result.success) {
    if (result.data == null) throw new Error('The response is missing data.');
    if (result.data.exists) {
      if (result.data == null) throw new Error('The response is missing data.');
      console.log('Theme:', result.data.value);
    } else {
      console.log('Theme not set');
    }
  } else {
    console.error('Failed to get value:', result.error);
  }
});
```
