---
title: search
---

# `search`

```typescript
client.threadSteps.search(stepId: string): Promise<ThreadStep>
```

Search for a step by stepId

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `stepId` | `string` | Yes |  |

## Returns

`Promise<ThreadStep>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threadSteps.search('stepId');
console.log(result);
```
