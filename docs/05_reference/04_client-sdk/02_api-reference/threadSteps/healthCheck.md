---
title: healthCheck
---

# `healthCheck`

```typescript
client.threadSteps.healthCheck(): Promise<HealthCheckResponse>
```

Health check for thread step service

## Parameters

_No parameters._

## Returns

`Promise<HealthCheckResponse>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threadSteps.healthCheck();
console.log(result);
```
