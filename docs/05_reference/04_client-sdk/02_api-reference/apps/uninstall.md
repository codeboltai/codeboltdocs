---
title: uninstall
---

# `uninstall`

```typescript
client.apps.uninstall(data: UninstallAppRequest): Promise<unknown>
```

Uninstalls an application.

Removes an installed app and cleans up its associated resources.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UninstallAppRequest` | Yes | The uninstall configuration |

## Returns

`Promise<unknown>` — A promise that resolves when the app has been uninstalled

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.apps.uninstall(/* UninstallAppRequest */);
console.log(result);
```
