---
title: addEnvAndServices
---

# `addEnvAndServices`

```typescript
client.application.addEnvAndServices(): Promise<void>
```

Triggers the addition of environment variables and services.

Initiates the process of detecting and adding environment variables
and service configurations to the current workspace.

## Parameters

_No parameters._

## Returns

`Promise<void>` — A promise that resolves when the operation is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.application.addEnvAndServices();
console.log(result);
```
