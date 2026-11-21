---
name: query
description: Query the KV store using DSL.
cbbaseinfo:
  description: Query the KV store using DSL.
data:
  name: query
  category: kvStore
  link: query.md
---

# query

```text
codebolt.kvStore.query(query: KVQueryDSL): Promise<KVQueryResponse>
```

Query the KV store using DSL

## Parameters

- `query` — Query DSL object

## When to use it

Find a subset of stored records. Apply the supported filters and use pagination when returning a large result set.

## Examples

### Simple Query - Get All Records in Namespace

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.kvStore.query({
    from: {
      instance: 'kv-instance-id',
      namespace: 'users'
    }
  });

  if (result.success) {
    if (result.data == null) throw new Error('The response is missing data.');
    console.log(`Found ${result.data.result.total} users`);
    result.data.result.records.forEach(record => {
      console.log(`- ${record.key}: ${record.value.name}`);
    });
  }
});
```

### Filter by Value Field

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.kvStore.query({
    from: {
      instance: 'kv-instance-id',
      namespace: 'users'
    },
    where: [
      { field: 'value.status', operator: 'eq', value: 'active' }
    ]
  });

  if (result.data == null) throw new Error('The response is missing data.');
  console.log('Active users:', result.data.result.records);
});
```

### Multiple Conditions with AND Logic

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);

  const result = await codebolt.kvStore.query({
    from: {
      instance: 'kv-instance-id',
      namespace: 'users'
    },
    where: [
      { field: 'value.status', operator: 'eq', value: 'active' },
      { field: 'value.lastLogin', operator: 'gte', value: oneDayAgo }
    ],
    orderBy: {
      field: 'value.lastLogin',
      direction: 'desc'
    }
  });

  if (result.data == null) throw new Error('The response is missing data.');
  console.log('Recently active users:', result.data.result.records);
});
```

### Search by Key Pattern

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.kvStore.query({
    from: {
      instance: 'kv-instance-id',
      namespace: 'cache'
    },
    where: [
      { field: 'key', operator: 'contains', value: 'user-' }
    ]
  });

  if (result.data == null) throw new Error('The response is missing data.');
  console.log(`Found ${result.data.result.total} keys matching 'user-'`);
});
```

### Date Range Query

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const startDate = new Date('2024-01-01').getTime();
  const endDate = new Date('2024-01-31').getTime();

  const result = await codebolt.kvStore.query({
    from: {
      instance: 'kv-instance-id',
      namespace: 'logs'
    },
    where: [
      { field: 'createdAt', operator: 'gte', value: startDate },
      { field: 'createdAt', operator: 'lte', value: endDate }
    ],
    orderBy: {
      field: 'createdAt',
      direction: 'asc'
    }
  });

  if (result.data == null) throw new Error('The response is missing data.');
  console.log(`Logs from January 2024: ${result.data.result.total} records`);
});
```

### Select Specific Fields

```javascript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.kvStore.query({
    from: {
      instance: 'kv-instance-id',
      namespace: 'users'
    },
    where: [
      { field: 'value.role', operator: 'eq', value: 'admin' }
    ],
    select: ['key', 'value.name', 'value.email'],
    limit: 100
  });

  if (result.data == null) throw new Error('The response is missing data.');
  result.data.result.records.forEach(record => {
    console.log(`Admin: ${record.value.name} (${record.value.email})`);
  });
});
```
