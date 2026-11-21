---
title: checkOverlap
---

# `checkOverlap`

```typescript
client.fileUpdateIntents.checkOverlap(data: CheckOverlapRequest): Promise<CheckOverlapResult>
```

Checks for overlapping file update intents.

Evaluates whether proposed file operations would conflict with existing
intents from other agents or processes. Returns detailed conflict information
to help resolve concurrent modification issues.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CheckOverlapRequest` | Yes | Request containing overlap check parameters |

## Returns

`Promise<CheckOverlapResult>` — A promise that resolves to overlap detection results

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.fileUpdateIntents.checkOverlap(/* CheckOverlapRequest */);
console.log(result);
```
