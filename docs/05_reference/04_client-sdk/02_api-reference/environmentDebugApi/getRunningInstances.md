---
title: getRunningInstances
---

# `getRunningInstances`

```typescript
client.environmentDebugApi.getRunningInstances(): Promise<EnvironmentDebugInstance[]>
```

Retrieves all currently running environment instances.

Returns only instances that are in an active/running state, which is
useful for monitoring dashboards and health checks.

## Parameters

_No parameters._

## Returns

`Promise<EnvironmentDebugInstance[]>` — A promise that resolves to an array of running  objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environmentDebugApi.getRunningInstances();
console.log(result);
```
