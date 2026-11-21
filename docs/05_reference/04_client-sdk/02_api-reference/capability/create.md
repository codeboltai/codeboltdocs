---
title: create
---

# `create`

```typescript
client.capability.create(data: CreateCapabilityRequest): Promise<Capability>
```

Creates a new capability.

Registers a new capability in the system, defining a skill or action
that agents can use.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateCapabilityRequest` | Yes | The capability creation payload |

## Returns

`Promise<Capability>` — A promise that resolves to the newly created Capability

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.capability.create(/* CreateCapabilityRequest */);
console.log(result);
```
