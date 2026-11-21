---
title: getEnvAndServices
---

# `getEnvAndServices`

```typescript
client.application.getEnvAndServices(): Promise<EnvAndServices>
```

Retrieves environment variables and service configurations.

Returns the environment variables and external service connection
details configured for the current workspace.

## Parameters

_No parameters._

## Returns

`Promise<EnvAndServices>` — A promise that resolves to the EnvAndServices object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.application.getEnvAndServices();
console.log(result);
```
