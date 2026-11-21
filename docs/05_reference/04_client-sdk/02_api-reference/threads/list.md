---
title: list
---

# `list`

```typescript
client.threads.list(params?: ThreadListParams): Promise<Thread[]>
```

Lists all threads with optional filtering.

Returns threads matching the provided query parameters, allowing you to
filter and paginate through the thread collection. Use this to browse
threads or find specific sets of threads based on criteria.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `ThreadListParams` | No | Optional query parameters for filtering threads |

## Returns

`Promise<Thread[]>` — A promise that resolves to an array of Thread objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threads.list();
console.log(result);
```
