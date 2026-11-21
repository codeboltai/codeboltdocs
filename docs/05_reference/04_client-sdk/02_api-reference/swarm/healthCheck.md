---
title: healthCheck
---

# `healthCheck`

```typescript
client.swarm.healthCheck(): Promise<object>
```

Health check for swarm service.

Returns service status, useful for monitoring and health dashboards.

## Parameters

_No parameters._

## Returns

`Promise<object>` — A promise that resolves to service status

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.swarm.healthCheck();
console.log(result);
```
