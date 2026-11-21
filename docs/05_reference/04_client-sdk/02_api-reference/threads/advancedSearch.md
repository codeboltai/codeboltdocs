---
title: advancedSearch
---

# `advancedSearch`

```typescript
client.threads.advancedSearch(data: ThreadSearchRequest): Promise<Thread[]>
```

Performs an advanced search for threads based on multiple criteria.

Allows complex queries with filtering, sorting, and pagination to find
threads matching specific conditions. Use this for flexible thread discovery
and management operations.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ThreadSearchRequest` | Yes | The search request containing filter and query parameters |

## Returns

`Promise<Thread[]>` — A promise that resolves to an array of matching Thread objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threads.advancedSearch(/* ThreadSearchRequest */);
console.log(result);
```
