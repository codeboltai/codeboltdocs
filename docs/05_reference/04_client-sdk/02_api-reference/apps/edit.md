---
title: edit
---

# `edit`

```typescript
client.apps.edit(data: EditAppRequest): Promise<unknown>
```

Opens an application for editing.

Launches the app's source code or configuration in an editable mode,
allowing modifications to its behavior.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `EditAppRequest` | Yes | The edit configuration |

## Returns

`Promise<unknown>` — A promise that resolves when the app is ready for editing

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.apps.edit(/* EditAppRequest */);
console.log(result);
```
