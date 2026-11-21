---
title: start
---

# `start`

```typescript
client.apps.start(data: StartAppRequest): Promise<unknown>
```

Starts an installed application.

Launches an app that has been previously installed, making its
functionality active in the runtime.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `StartAppRequest` | Yes | The start configuration |

## Returns

`Promise<unknown>` — A promise that resolves when the app has been started

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.apps.start(/* StartAppRequest */);
console.log(result);
```
