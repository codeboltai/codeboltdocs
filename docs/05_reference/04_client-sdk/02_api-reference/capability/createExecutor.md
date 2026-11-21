---
title: createExecutor
---

# `createExecutor`

```typescript
client.capability.createExecutor(data: CreateCapabilityExecutorRequest): Promise<CapabilityExecutor>
```

Creates a new capability executor.

Registers an executor implementation that can handle invocations
of a specific capability.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateCapabilityExecutorRequest` | Yes | The executor creation payload |

## Returns

`Promise<CapabilityExecutor>` — A promise that resolves to the created CapabilityExecutor

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.capability.createExecutor(/* CreateCapabilityExecutorRequest */);
console.log(result);
```
