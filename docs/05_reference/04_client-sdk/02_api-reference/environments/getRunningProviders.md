---
title: getRunningProviders
---

# `getRunningProviders`

```typescript
client.environments.getRunningProviders(): Promise<InstalledProvider[]>
```

Retrieves all currently running environment providers.

Returns only providers that are actively running and available to serve
environment requests.

## Parameters

_No parameters._

## Returns

`Promise<InstalledProvider[]>` — A promise that resolves to an array of running  objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environments.getRunningProviders();
console.log(result);
```
