---
title: graph
---

# `graph`

```typescript
client.git.graph(data?: GitGraphRequest): Promise<GitCommit[]>
```

Retrieves the commit graph (history) of the repository.

Returns an array of commits representing the repository's history.
Useful for rendering commit timelines or inspecting past changes.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GitGraphRequest` | No | Optional parameters to filter the graph (e.g., branch, limit) |

## Returns

`Promise<GitCommit[]>` — A promise that resolves to an array of  objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.git.graph();
console.log(result);
```
