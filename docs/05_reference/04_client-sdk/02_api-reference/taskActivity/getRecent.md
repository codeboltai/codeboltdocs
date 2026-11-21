---
title: getRecent
---

# `getRecent`

```typescript
client.taskActivity.getRecent(): Promise<TaskActivity[]>
```

Get recent activities

## Parameters

_No parameters._

## Returns

`Promise<TaskActivity[]>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.taskActivity.getRecent();
console.log(result);
```
