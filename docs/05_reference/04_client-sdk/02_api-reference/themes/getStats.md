---
title: getStats
---

# `getStats`

```typescript
client.themes.getStats(): Promise<ThemeStats>
```

Retrieves theme statistics and metrics.

Returns aggregated data about themes including counts, usage statistics,
and other analytical information useful for monitoring and reporting.

## Parameters

_No parameters._

## Returns

`Promise<ThemeStats>` — A promise that resolves to a ThemeStats object containing metrics

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.themes.getStats();
console.log(result);
```
