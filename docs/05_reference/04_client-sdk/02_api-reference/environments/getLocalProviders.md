---
title: getLocalProviders
---

# `getLocalProviders`

```typescript
client.environments.getLocalProviders(): Promise<ProviderData[]>
```

Retrieves the list of available local environment providers.

Discovers providers installed on the local machine that can be used
to create new environments. Useful for populating provider selection UIs.

## Parameters

_No parameters._

## Returns

`Promise<ProviderData[]>` — A promise that resolves to an array of  descriptors

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environments.getLocalProviders();
console.log(result);
```
