---
name: getInstance
description: Get a KV store instance by ID.
cbbaseinfo:
  description: Get a KV store instance by ID.
data:
  name: getInstance
  category: kvStore
  link: getInstance.md
---

# getInstance

```text
codebolt.kvStore.getInstance(instanceId: string): Promise<KVInstanceResponse>
```

Get a KV store instance by ID

## Parameters

- `instanceId` — Instance ID

## When to use it

Look up a store's metadata before reading or writing entries.

## Example

### Retrieve Instance Details

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const instanceId = 'kv-1234567890';
  const result = await codebolt.kvStore.getInstance(instanceId);

  if (result.success) {
    if (result.data == null) throw new Error('The response is missing data.');
    const { id, name, description, createdAt, updatedAt } = result.data.instance;
    console.log(`Instance: ${name} (${id})`);
    console.log(`Description: ${description || 'No description'}`);
    console.log(`Created: ${new Date(createdAt).toLocaleString()}`);
    console.log(`Updated: ${new Date(updatedAt).toLocaleString()}`);
  } else {
    console.error('Failed to get instance:', result.error);
  }
});
```
