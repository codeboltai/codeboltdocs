---
name: getNamespaces
description: Get all namespaces in an instance.
cbbaseinfo:
  description: Get all namespaces in an instance.
data:
  name: getNamespaces
  category: kvStore
  link: getNamespaces.md
---

# getNamespaces

```text
codebolt.kvStore.getNamespaces(instanceId: string): Promise<KVNamespacesResponse>
```

Get all namespaces in an instance

## Parameters

- `instanceId` — Instance ID

## When to use it

List the namespaces already present in a store to choose where to read or write data.

## Examples

### List All Namespaces

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.kvStore.getNamespaces('kv-instance-id');

  if (result.success) {
    if (result.data == null) throw new Error('The response is missing data.');
    console.log(`Found ${result.data.namespaces.length} namespaces:`);
    result.data.namespaces.forEach(namespace => {
      console.log(`- ${namespace}`);
    });
  } else {
    console.error('Failed to get namespaces:', result.error);
  }
});
```

### Find Namespaces by Pattern

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.kvStore.getNamespaces('kv-instance-id');

  if (result.success) {
    if (result.data == null) throw new Error('The response is missing data.');
    const userNamespaces = result.data.namespaces.filter(ns =>
      ns.startsWith('user-')
    );

    console.log(`Found ${userNamespaces.length} user namespaces`);
    userNamespaces.forEach(ns => console.log(`- ${ns}`));
  }
});
```
