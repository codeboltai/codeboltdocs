---
title: healthCheck
---

# `healthCheck`

```typescript
client.tasks.healthCheck(): Promise<object>
```

Performs a health check on the task service.

Verifies that the task management service is operational and responding.
Use this to monitor service availability or for health monitoring in
production environments.

## Parameters

_No parameters._

## Returns

`Promise<object>` — A promise that resolves to an object containing the service status

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.tasks.healthCheck();
console.log(result);
```
