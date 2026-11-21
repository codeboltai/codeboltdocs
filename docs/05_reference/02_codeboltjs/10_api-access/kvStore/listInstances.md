---
name: listInstances
description: List all KV store instances.
cbbaseinfo:
  description: List all KV store instances.
data:
  name: listInstances
  category: kvStore
  link: listInstances.md
---

# listInstances

```text
codebolt.kvStore.listInstances(): Promise<KVInstanceListResponse>
```

List all KV store instances

## When to use it

Find store identifiers for setup, diagnostics, or a store picker.

## Examples

### List All Instances

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.kvStore.listInstances();

  if (result.success) {
    if (result.data == null) throw new Error('The response is missing data.');
    console.log(`Found ${result.data.instances.length} instances:`);
    result.data.instances.forEach(instance => {
      console.log(`- ${instance.name} (${instance.id})`);
    });
  } else {
    console.error('Failed to list instances:', result.error);
  }
});
```

### Find Unused Instances

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  async function findStaleInstances(daysThreshold = 30) {
    const result = await codebolt.kvStore.listInstances();

    if (!result.success) {
      return [];
    }

    const threshold = Date.now() - (daysThreshold * 24 * 60 * 60 * 1000);

    if (result.data == null) throw new Error('The response is missing data.');
    return result.data.instances.filter(instance => {
      const updated = new Date(instance.updatedAt).getTime();
      return updated < threshold;
    });
  }

  // Usage
  const staleInstances = await findStaleInstances(30);

  if (staleInstances.length > 0) {
    console.log('Stale instances (not updated in 30 days):');
    staleInstances.forEach(instance => {
      const daysSinceUpdate = Math.floor(
        (Date.now() - new Date(instance.updatedAt).getTime()) / (24 * 60 * 60 * 1000)
      );
      console.log(`- ${instance.name} (${daysSinceUpdate} days)`);
    });
  } else {
    console.log('No stale instances found');
  }
});
```

### Sort Instances by Creation Date

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.kvStore.listInstances();

  if (result.success) {
    if (result.data == null) throw new Error('The response is missing data.');
    const sorted = [...result.data.instances].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    console.log('Instances (newest first):');
    sorted.forEach((instance, index) => {
      const created = new Date(instance.createdAt).toLocaleDateString();
      console.log(`${index + 1}. ${instance.name}`);
      console.log(`   Created: ${created}`);
      console.log(`   ID: ${instance.id}`);
      console.log('');
    });
  }
});
```
