---
name: set
description: Set a value in the KV store.
cbbaseinfo:
  description: Set a value in the KV store.
data:
  name: set
  category: kvStore
  link: set.md
---

# set

```text
codebolt.kvStore.set(instanceId: string, namespace: string, key: string, value: any, autoCreateInstance?: boolean): Promise<KVSetResponse>
```

Set a value in the KV store

## Parameters

- `instanceId` — Instance ID
- `namespace` — Namespace
- `key` — Key
- `value` — Value to store
- `autoCreateInstance` — Auto-create instance if it doesn't exist

## When to use it

Save a configuration value, cached result, or workflow checkpoint under a key you can retrieve later.

## Example

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.kvStore.set(
    'new-instance-id',
    'cache',
    'key1',
    { data: 'value' },
    true // autoCreateInstance
  );

  if (result.success) {
    console.log('Value stored (instance auto-created if needed)');
  } else if (result.error?.includes('not found')) {
    console.log('Instance does not exist and auto-create is disabled');
  }
});
```

## More examples

### Store a Simple Value

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.kvStore.set(
    'kv-instance-id',
    'user-preferences',
    'theme',
    'dark'
  );

  if (result.success) {
    console.log('Value stored successfully');
    if (result.data == null) throw new Error('The response is missing data.');
    console.log('Record ID:', result.data.record.id);
  } else {
    console.error('Failed to store value:', result.error);
  }
});
```

### Store Complex Object Data

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const userProfile = {
    userId: 'user-123',
    name: 'John Doe',
    email: 'john@example.com',
    preferences: {
      theme: 'dark',
      language: 'en',
      notifications: {
        email: true,
        push: false,
        sms: false
      }
    },
    metadata: {
      createdAt: Date.now(),
      source: 'registration'
    }
  };

  const result = await codebolt.kvStore.set(
    'kv-instance-id',
    'users',
    'user-123',
    userProfile
  );

  if (result.success) {
    if (result.data == null) throw new Error('The response is missing data.');
    console.log('User profile stored:', result.data.record.id);
  }
});
```

### Update Existing Value

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // First, store initial value
  await codebolt.kvStore.set(
    'kv-instance-id',
    'counter',
    'visits',
    { count: 0, lastVisit: null }
  );

  // Later, update the value
  const current = await codebolt.kvStore.get(
    'kv-instance-id',
    'counter',
    'visits'
  );

  if (current.data == null) throw new Error('The response is missing data.');
  if (current.data.exists) {
    if (current.data == null) throw new Error('The response is missing data.');
    const updated = {
      count: current.data.value.count + 1,
      lastVisit: Date.now()
    };

    await codebolt.kvStore.set(
      'kv-instance-id',
      'counter',
      'visits',
      updated
    );

    console.log('Counter updated');
  }
});
```

### Store Array Data

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const shoppingList = [
    { id: 1, name: 'Milk', quantity: 2, purchased: false },
    { id: 2, name: 'Bread', quantity: 1, purchased: false },
    { id: 3, name: 'Eggs', quantity: 12, purchased: true }
  ];

  const result = await codebolt.kvStore.set(
    'kv-instance-id',
    'shopping',
    'list-2024-01-19',
    shoppingList
  );

  if (result.success) {
    console.log('Shopping list saved');
  }
});
```
