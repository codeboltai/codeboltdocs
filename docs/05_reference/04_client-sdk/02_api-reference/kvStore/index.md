---
title: KvStore API
---

# KvStore API

KV Store API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`createInstance`](./createInstance) | Creates a new KV store instance. |
| [`deleteInstance`](./deleteInstance) | Deletes a KV store instance and all its data. |
| [`deleteNamespace`](./deleteNamespace) | Deletes all key-value pairs within a namespace. |
| [`deleteValue`](./deleteValue) | Deletes a single key-value pair from the store. |
| [`getInstance`](./getInstance) | Retrieves a specific KV store instance by its ID. |
| [`getValue`](./getValue) | Retrieves a value by its key within a specific namespace. |
| [`listInstances`](./listInstances) | Lists all KV store instances. |
| [`query`](./query) | Queries key-value data using filter criteria. |
| [`setValue`](./setValue) | Sets a key-value pair in the store. |
| [`updateInstance`](./updateInstance) | Updates a KV store instance's configuration. |

## Methods

---

### `createInstance`

```typescript
client.kvStore.createInstance(data: CreateKvStoreInstanceRequest): Promise<KvStoreInstance>
```

Creates a new KV store instance.

An instance is an isolated key-value store that can contain multiple
namespaces. Use separate instances to isolate data between different
agents or workflows.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateKvStoreInstanceRequest` | Yes | Instance creation payload including name and configuration |

**Returns:** `Promise<KvStoreInstance>` — A promise that resolves to the newly created

[Full reference →](./createInstance)

---

### `deleteInstance`

```typescript
client.kvStore.deleteInstance(id: string): Promise<unknown>
```

Deletes a KV store instance and all its data.

Permanently removes the instance, all its namespaces, and all
stored key-value pairs. This action cannot be undone.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the instance to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when deletion is complete

[Full reference →](./deleteInstance)

---

### `deleteNamespace`

```typescript
client.kvStore.deleteNamespace(instanceId: string, namespace: string): Promise<unknown>
```

Deletes all key-value pairs within a namespace.

Clears the entire namespace, removing every key and its associated
value. Other namespaces in the instance are not affected.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `instanceId` | `string` | Yes | The unique identifier of the KV store instance |
| `namespace` | `string` | Yes | The namespace to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when the namespace has been cleared

[Full reference →](./deleteNamespace)

---

### `deleteValue`

```typescript
client.kvStore.deleteValue(instanceId: string, namespace: string, key: string): Promise<unknown>
```

Deletes a single key-value pair from the store.

Removes the specified key and its value from the namespace. Other
keys in the same namespace are not affected.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `instanceId` | `string` | Yes | The unique identifier of the KV store instance |
| `namespace` | `string` | Yes | The namespace containing the key |
| `key` | `string` | Yes | The key to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when the key-value pair has been deleted

[Full reference →](./deleteValue)

---

### `getInstance`

```typescript
client.kvStore.getInstance(id: string): Promise<KvStoreInstance>
```

Retrieves a specific KV store instance by its ID.

Returns the full details of the instance including its configuration
and namespace listing.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the KV store instance |

**Returns:** `Promise<KvStoreInstance>` — A promise that resolves to the

[Full reference →](./getInstance)

---

### `getValue`

```typescript
client.kvStore.getValue(instanceId: string, namespace: string, key: string): Promise<KvValue>
```

Retrieves a value by its key within a specific namespace.

Looks up a single key-value pair in the specified instance and
namespace. Returns the value along with its metadata.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `instanceId` | `string` | Yes | The unique identifier of the KV store instance |
| `namespace` | `string` | Yes | The namespace containing the key |
| `key` | `string` | Yes | The key to look up |

**Returns:** `Promise<KvValue>` — A promise that resolves to the  including the stored data

[Full reference →](./getValue)

---

### `listInstances`

```typescript
client.kvStore.listInstances(params?: Record<string, unknown>): Promise<KvStoreInstance[]>
```

Lists all KV store instances.

Returns every instance in the system with their metadata and
namespace information.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

**Returns:** `Promise<KvStoreInstance[]>` — A promise that resolves to an array of  objects

[Full reference →](./listInstances)

---

### `query`

```typescript
client.kvStore.query(data: KvQueryRequest): Promise<KvValue[]>
```

Queries key-value data using filter criteria.

Searches across namespaces and keys using the provided filter
parameters. Useful for finding values that match specific patterns
or conditions.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `KvQueryRequest` | Yes | Query parameters specifying filters and scope |

**Returns:** `Promise<KvValue[]>` — A promise that resolves to an array of matching  objects

[Full reference →](./query)

---

### `setValue`

```typescript
client.kvStore.setValue(data: SetKvValueRequest): Promise<KvValue>
```

Sets a key-value pair in the store.

Creates or overwrites a value at the specified key within a namespace
and instance. The value can be any JSON-serializable data.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `SetKvValueRequest` | Yes | The set request including instance ID, namespace, key, and value |

**Returns:** `Promise<KvValue>` — A promise that resolves to the stored

[Full reference →](./setValue)

---

### `updateInstance`

```typescript
client.kvStore.updateInstance(id: string, data: UpdateKvStoreInstanceRequest): Promise<KvStoreInstance>
```

Updates a KV store instance's configuration.

Modifies instance properties such as name or settings. The stored
data is not affected by instance updates.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the instance to update |
| `data` | `UpdateKvStoreInstanceRequest` | Yes | The fields to update |

**Returns:** `Promise<KvStoreInstance>` — A promise that resolves to the updated

[Full reference →](./updateInstance)

