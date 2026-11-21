---
title: getStatistics
---

# `getStatistics`

```typescript
client.taskActivity.getStatistics(): Promise<TaskActivityStatistics>
```

Get activity statistics overview

## Parameters

_No parameters._

## Returns

`Promise<TaskActivityStatistics>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.taskActivity.getStatistics();
console.log(result);
```
