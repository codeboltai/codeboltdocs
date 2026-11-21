---
title: getById
---

# `getById`

```typescript
client.threadSteps.getById(id: string): Promise<ThreadStep>
```

Get a step by internal ID

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes |  |

## Returns

`Promise<ThreadStep>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threadSteps.getById('id');
console.log(result);
```
