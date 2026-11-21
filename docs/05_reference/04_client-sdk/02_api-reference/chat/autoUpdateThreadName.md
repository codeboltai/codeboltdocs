---
title: autoUpdateThreadName
---

# `autoUpdateThreadName`

```typescript
client.chat.autoUpdateThreadName(data: AutoUpdateThreadNameRequest): Promise<void>
```

Automatically generates and updates the thread name based on content.

Uses the user's message or conversation context to generate a
descriptive name for the thread, replacing any existing name.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `AutoUpdateThreadNameRequest` | Yes | The auto-update request |

## Returns

`Promise<void>` — A promise that resolves when the name has been auto-updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.chat.autoUpdateThreadName(/* AutoUpdateThreadNameRequest */);
console.log(result);
```
