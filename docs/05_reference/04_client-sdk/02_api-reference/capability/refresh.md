---
title: refresh
---

# `refresh`

```typescript
client.capability.refresh(data?: Record<string, unknown>): Promise<unknown>
```

Refreshes the capability registry.

Forces a re-scan and reload of all registered capabilities, picking
up any newly added or modified capability definitions.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `Record<string, unknown>` | No | Optional configuration for the refresh operation |

## Returns

`Promise<unknown>` — A promise that resolves when the refresh is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.capability.refresh();
console.log(result);
```
