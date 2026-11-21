---
title: fork
---

# `fork`

```typescript
client.apps.fork(data: ForkAppRequest): Promise<unknown>
```

Forks an existing application.

Creates a copy of an app that can be independently modified and
customized. Useful for creating variants of existing apps.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ForkAppRequest` | Yes | The fork configuration |

## Returns

`Promise<unknown>` — A promise that resolves when the app has been forked

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.apps.fork(/* ForkAppRequest */);
console.log(result);
```
