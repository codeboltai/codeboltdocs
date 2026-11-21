---
title: getAllWithUniqueId
---

# `getAllWithUniqueId`

```typescript
client.projects.getAllWithUniqueId(data: GetAllProjectsRequest): Promise<Project[]>
```

Retrieves all projects with their unique identifiers.

Returns the complete list of projects matching the request criteria, each with a
guaranteed unique ID for cross-referencing.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GetAllProjectsRequest` | Yes | The request specifying which projects to retrieve |

## Returns

`Promise<Project[]>` — A promise that resolves to an array of projects with unique IDs

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.projects.getAllWithUniqueId(/* GetAllProjectsRequest */);
console.log(result);
```
