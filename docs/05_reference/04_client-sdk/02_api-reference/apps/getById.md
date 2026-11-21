---
title: getById
---

# `getById`

```typescript
client.apps.getById(appId: string): Promise<App>
```

Retrieves a specific application by its ID.

Returns the full App object including its metadata, configuration,
and current status.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `appId` | `string` | Yes | The unique identifier of the app |

## Returns

`Promise<App>` — A promise that resolves to the App object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.apps.getById('appId');
console.log(result);
```
