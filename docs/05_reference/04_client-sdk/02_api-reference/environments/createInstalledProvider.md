---
title: createInstalledProvider
---

# `createInstalledProvider`

```typescript
client.environments.createInstalledProvider(data: CreateInstalledProviderRequest): Promise<InstalledProvider>
```

Registers a new installed environment provider.

Creates a provider record from an already-installed provider on the system.
This makes the provider available for environment creation.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateInstalledProviderRequest` | Yes | The provider registration details |

## Returns

`Promise<InstalledProvider>` — A promise that resolves to the newly created

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environments.createInstalledProvider(/* CreateInstalledProviderRequest */);
console.log(result);
```
