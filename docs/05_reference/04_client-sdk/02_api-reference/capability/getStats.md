---
title: getStats
---

# `getStats`

```typescript
client.capability.getStats(): Promise<CapabilityStats>
```

Retrieves aggregate statistics about capabilities.

Returns summary metrics about the capability system including
total counts, usage rates, and executor distribution.

## Parameters

_No parameters._

## Returns

`Promise<CapabilityStats>` — A promise that resolves to the CapabilityStats object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.capability.getStats();
console.log(result);
```
