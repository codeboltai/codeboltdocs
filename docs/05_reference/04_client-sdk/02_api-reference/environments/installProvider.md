---
title: installProvider
---

# `installProvider`

```typescript
client.environments.installProvider(data: InstallProviderRequest): Promise<InstalledProvider>
```

Installs a new environment provider from a remote source.

Downloads and registers a provider, making it available for creating
environments. Use this when the provider is not yet present locally.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `InstallProviderRequest` | Yes | Installation parameters including provider source and configuration |

## Returns

`Promise<InstalledProvider>` — A promise that resolves to the newly installed

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environments.installProvider(/* InstallProviderRequest */);
console.log(result);
```
