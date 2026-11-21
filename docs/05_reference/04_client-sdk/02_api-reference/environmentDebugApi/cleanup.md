---
title: cleanup
---

# `cleanup`

```typescript
client.environmentDebugApi.cleanup(): Promise<unknown>
```

Cleans up stale or orphaned environment instances.

Removes environment instances that are no longer active or have been
orphaned due to provider failures. This is a maintenance operation that
should be run periodically to keep the debug index clean.

## Parameters

_No parameters._

## Returns

`Promise<unknown>` — A promise that resolves when cleanup is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environmentDebugApi.cleanup();
console.log(result);
```
