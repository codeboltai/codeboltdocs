---
title: install
---

# `install`

```typescript
client.apps.install(data: InstallAppRequest): Promise<unknown>
```

Installs an application.

Downloads and registers an app, making it available in the CodeBolt
environment for use.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `InstallAppRequest` | Yes | The installation configuration |

## Returns

`Promise<unknown>` — A promise that resolves when the app has been installed

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.apps.install(/* InstallAppRequest */);
console.log(result);
```
