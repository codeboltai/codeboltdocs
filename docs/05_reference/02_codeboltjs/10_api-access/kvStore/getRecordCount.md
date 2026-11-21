---
name: getRecordCount
description: Get record count for an instance or namespace.
cbbaseinfo:
  description: Get record count for an instance or namespace.
data:
  name: getRecordCount
  category: kvStore
  link: getRecordCount.md
---

# getRecordCount

```text
codebolt.kvStore.getRecordCount(instanceId: string, namespace?: string): Promise<KVRecordCountResponse>
```

Get record count for an instance or namespace

## Parameters

- `instanceId` — Instance ID
- `namespace` — Optional namespace filter

## When to use it

Check the count before and after an import or cleanup.

## Examples

### Count All Records in Instance

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.kvStore.getRecordCount('kv-instance-id');

  if (result.success) {
    if (result.data == null) throw new Error('The response is missing data.');
    console.log(`Total records in instance: ${result.data.count}`);
  } else {
    console.error('Failed to get count:', result.error);
  }
});
```

### Count Records in Namespace

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.kvStore.getRecordCount(
    'kv-instance-id',
    'users'
  );

  if (result.success) {
    if (result.data == null) throw new Error('The response is missing data.');
    console.log(`Users namespace has ${result.data.count} records`);
  }
});
```
