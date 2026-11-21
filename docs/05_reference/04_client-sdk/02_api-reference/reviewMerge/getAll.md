---
title: getAll
---

# `getAll`

```typescript
client.reviewMerge.getAll(params?: Record<string, unknown>): Promise<ReviewMergeRequest[]>
```

Retrieves all review-merge requests, optionally filtered by query parameters.

Returns the complete list of review-merge requests. Use the optional params to filter
by status, date range, or other criteria supported by the server.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering the results |

## Returns

`Promise<ReviewMergeRequest[]>` — A promise that resolves to an array of ReviewMergeRequest objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.reviewMerge.getAll();
console.log(result);
```
