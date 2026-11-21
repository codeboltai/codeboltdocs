---
title: query
---

# `query`

```typescript
client.kvStore.query(data: KvQueryRequest): Promise<KvValue[]>
```

Queries key-value data using filter criteria.

Searches across namespaces and keys using the provided filter
parameters. Useful for finding values that match specific patterns
or conditions.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `KvQueryRequest` | Yes | Query parameters specifying filters and scope |

## Returns

`Promise<KvValue[]>` — A promise that resolves to an array of matching  objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.kvStore.query(/* KvQueryRequest */);
console.log(result);
```
