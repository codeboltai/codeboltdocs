---
title: healthCheck
---

# `healthCheck`

```typescript
client.threads.healthCheck(): Promise<object>
```

Performs a health check on the thread service.

Verifies that the thread service is operational and responding to requests.
Use this for service monitoring or to check availability before performing
other thread operations.

## Parameters

_No parameters._

## Returns

`Promise<object>` — A promise that resolves to an object containing the service status

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threads.healthCheck();
console.log(result);
```
